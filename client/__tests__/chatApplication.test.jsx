import React from "react";
import ReactDOM from "react-dom";
import { ChatApplication } from "../chatApplication";

describe("Chat application", () => {
  it("shows chats", () => {
    const chats = [
      { user: "test user", message: "message 1 " },
      { user: "other user", message: "message 2" },
    ];

    const element = document.createElement("div");
    ReactDOM.render(<ChatApplication messages={chats} />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });
});
