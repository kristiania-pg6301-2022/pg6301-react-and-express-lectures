import React, { useState } from "react";

export function ChatApplication({ messages, onNewMessage }) {
  const [message, setMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }
  return (
    <>
      <header>Kristiania Chat</header>
      <main>
        {messages.map(({ message, user }, index) => (
          <div key={index}>
            <strong>{user}:</strong> {message}
          </div>
        ))}
      </main>
      <footer>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}
