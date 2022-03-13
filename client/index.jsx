import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ChatApplication } from "./chatApplication";

const initialMessages = [
  {
    user: "User 1",
    message: "Message 1 from main",
  },
  {
    user: "User 2",
    message: "Message 2",
  },
  {
    user: "User 1",
    message: "Message 3",
  },
];

function Application() {
  const [messages, setMessages] = useState(initialMessages);

  function handleNewMessage(message) {
    setMessages((messages) => [...messages, { message }]);
  }
  return (
    <ChatApplication messages={messages} onNewMessage={handleNewMessage} />
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
