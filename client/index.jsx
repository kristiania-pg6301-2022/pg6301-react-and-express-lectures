import React from "react";
import ReactDOM from "react-dom";
import { ChatApplication } from "./chatApplication";

const messages = [
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

ReactDOM.render(
  <ChatApplication messages={messages} />,
  document.getElementById("app")
);
