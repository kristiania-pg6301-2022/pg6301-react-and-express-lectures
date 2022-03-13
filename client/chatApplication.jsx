import React from "react";

export function ChatApplication({ messages }) {
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
        <form>
          <input autoFocus={true} />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}
