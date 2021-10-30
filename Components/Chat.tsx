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
import {handleAPIError, isTextIsEmpty, terminateKeyword} from "../Utils";
import { StoreContext } from '../pages/_app';
import AiceChatServer from '../API/AiceChatServer';

interface IMessage {
  msg: String,
  author: String,
  timeStamp: Date
}

export default function Chat<NextPage>() {
  let inputBox = useRef(null);
  let messageEnd = useRef(null);

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages]: [Array<IMessage>, Dispatch<any>] = useState([
    // { msg: "Message1", author: "doggo", timeStamp: new Date()},
  ]);

  const {
      roomId: [roomId, _],
      username: [username, __]
  } = useContext(StoreContext);

  const handleFormSubmission: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    AiceChatServer
    .messageSend(roomId, username, messageText)
    .then((_) => {
      setMessageText("");
      // inputBox!.focus();
    })
    .catch(handleAPIError);
    // sendChatMessage({ msg: messageText, author: username});
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
        const newMessages: IMessage[] = data.messages.map((m: any) => ({msg: m.message, author: m.username, timeStamp: new Date(m.timeStamp)}));
        setMessages(newMessages);

        // auto scroll to last message
        if (messageEnd?.current) {
          const curr = messageEnd.current as HTMLDivElement;
          curr.scrollIntoView({ behavior: "smooth" })
        }
      })
      .catch(handleAPIError);
    }, 1000);

    return () => {
      clearInterval(updateMessages);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messages = receivedMessages.map(({ msg, author, timeStamp}, index) => {
    // show leave warning ONLY to other user
    if (msg === terminateKeyword) {
      if (author === username) return <></>;
      return (<div style={{textAlign: 'center'}}><p>{author} possibly left the site.</p></div>)
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
            <div/>
          </header>

          <main className="msger-chat">
            {messages}
            <div ref={messageEnd}/>
          </main>

          <form onSubmit={handleFormSubmission} className="msger-inputarea">
            <input
                ref={inputBox}
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                className="msger-input"
                placeholder="Enter your message..."/>
            <button type="submit" className="msger-send-btn"
                    disabled={isTextIsEmpty(messageText)}>Send
            </button>
          </form>
        </div>
      </div>
  );
}
