import React, {
  Dispatch,
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState
} from 'react';
import Link from "next/link";

interface IMessage {
  data: String,
  author: String
}

export default function ChatComponent<NextPage>() {
  let inputBox: HTMLInputElement|null = null;
  let messageEnd: HTMLDivElement|null = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages]: [Array<IMessage>, Dispatch<any>] = useState([
    {data: "Message1", author: "doggo"},
    {data: "Message2", author: "me"},
    {data: "Message3", author: "me"}
  ]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const sendChatMessage = (messageText: IMessage) => {
    setMessageText("");
    inputBox!.focus();
    const history = receivedMessages.slice(-199);
    setMessages([...history, messageText]);
  }

  const handleFormSubmission: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    sendChatMessage({data: messageText, author: "me"});
  }

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    event.preventDefault();
    sendChatMessage({data: messageText, author: "me"});
  }

  const messages = receivedMessages.map(({data, author}, index) => {
    // return <span key={index} data-author={author}>{data}</span>;
    const currentUsername = 'me';
    return (
        <div className={`msg ${author === currentUsername ? 'right' : 'left'}-msg`} key={index}>
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">{author}</div>
              <div className="msg-info-time">12:45</div>
            </div>

            <div className="msg-text">{data}</div>
          </div>
        </div>
    );
  });

  useEffect(() => {
    messageEnd!.scrollIntoView({ behavior: "smooth" });
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
            <div ref={(element) => {
              messageEnd = element;
            }}/>
          </main>

          <form onSubmit={handleFormSubmission} className="msger-inputarea">
            <input
                ref={(element) => {
                  inputBox = element;
                }}
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text"
                className="msger-input"
                placeholder="Enter your message..."/>
            <button type="submit" className="msger-send-btn"
                    disabled={messageTextIsEmpty}>Send
            </button>
          </form>
        </div>
      </div>
  );
}
