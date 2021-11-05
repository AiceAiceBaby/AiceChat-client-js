import React, {
  Dispatch,
  FormEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import Link from "next/link";
import {encryptedKeyword, handleAPIError, isTextIsEmpty, rsaDecrypt, rsaEncrypt, terminateKeyword} from "../Utils";
import { StoreContext } from '../pages/_app';
import AiceChatServer from '../API/AiceChatServer';

interface IMessage {
  msg: string,
  author: string,
  timeStamp: Date
}

export default function Chat<NextPage>() {
  let inputBox: React.RefObject<HTMLInputElement> = useRef(null);
  let messageEnd = useRef(null);

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages]: [Array<IMessage>, Dispatch<any>] = useState([
    // { msg: "Message1", author: "doggo", timeStamp: new Date()},
  ]);

  const {
      roomId: [roomId, _],
      username: [username, __],
      selfPrivateKey: [selfPrivateKey, ___],
      otherPublicKey: [otherPublicKey, ____]
  } = useContext(StoreContext);

  const handleSend: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    AiceChatServer
    .messageSend(roomId, username, messageText)
    .then((_) => {
      setMessageText("");
      inputBox?.current?.focus();
    })
    .catch(handleAPIError);
  }

  const handleSendEncrypted: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    try {
      const encryptedMessageText = encryptedKeyword + rsaEncrypt(otherPublicKey, messageText);
      AiceChatServer
      .messageSend(roomId, username, encryptedMessageText)
      .then((_) => {
        setMessageText("");
        inputBox?.current?.focus();
      })
      .catch(handleAPIError);
    } catch (e) {
      alert("There was error while using the given public key.")
    }


  }

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.charCode !== 13 || isTextIsEmpty(messageText)) {
      return;
    }
  }

  useEffect(() => {
    window.onbeforeunload = (event) => {
      AiceChatServer.messageSend(roomId, username, terminateKeyword);
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ''; // Legacy method for cross browser support
      }
      return ''; // Legacy method for cross browser support
    };

    const updateMessages = setInterval(() => {
      AiceChatServer.messageGet(roomId)
      .then(({data}) => {
        const newMessages: IMessage[] = data.messages.map((m: any) => {
          let msg = m.message as string;
          if ((msg).startsWith(encryptedKeyword) && m.username !== username) {
            const encryptedMsg = msg.split(encryptedKeyword)[1];
            msg = rsaDecrypt(selfPrivateKey, encryptedMsg);
          }

          return {msg, author: m.username, timeStamp: new Date(m.timeStamp)};
        });
        // auto scroll to last message only if there's a new message
        if (messageEnd?.current) {
          const curr = messageEnd.current as HTMLDivElement;
          curr.scrollIntoView({ behavior: "smooth" })
        }
        setMessages(newMessages);
      })
      .catch(handleAPIError);
    }, 1000);

    return () => {
      clearInterval(updateMessages);
      AiceChatServer.messageSend(roomId, username, terminateKeyword);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messages = receivedMessages.map(({ msg, author, timeStamp}, index) => {
    // show leave warning ONLY to other user
    if (msg === terminateKeyword) {
      if (author === username) return <></>;
      return (<div style={{textAlign: 'center'}}><p>{author} possibly left the conversation.</p></div>)
    }
    // show normal message
    return (
        <div className={`msg ${author === username ? 'right' : 'left'}-msg`} key={index}>
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">{author}</div>
              <div className="msg-info-time">{timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
            </div>

            <div className="msg-text">{msg}</div>
          </div>
        </div>
    );
  });

  return (
      <div className="msger-container">
        <div className="msger">
          <header className="msger-header">
            <div className="msger-header-left title">
              <Link href="/">
                <a className="link">⬅</a>
              </Link>
            ️</div>
            <div className="msger-header-left title">Aice Chat</div>
            <div className="msger-header-left title">
              <Link href="/settings">
                <a>settings</a>
              </Link>
            ️</div>
          </header>

          <main className="msger-chat">
            {messages}
            <div ref={messageEnd}/>
          </main>

          <form className="msger-inputarea">
            <input ref={inputBox}
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="text"
                  className="msger-input"
                  placeholder="Enter your message..."/>
            <button type="submit"
                    className="msger-send-btn"
                    onClick={handleSend}
                    disabled={isTextIsEmpty(messageText)}>Send
            </button>
            <button type="submit"
                    className="msger-send-btn"
                    onClick={handleSendEncrypted}
                    disabled={isTextIsEmpty(messageText)}>Send (Encrypted)
            </button>
          </form>
        </div>
      </div>
  );
}
