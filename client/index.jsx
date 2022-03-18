import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username);
  }

  return (
    <div>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}

function ChatMessage({ chat: { author, message } }) {
  return (
    <div>
      <strong>{author}: </strong>
      {message}
    </div>
  );
}

function ChatApplication({ username }) {
  const [ws, setWs] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      console.log(event.data);
      const { author, message } = JSON.parse(event.data);
      setChatLog([...chatLog, { author, message }]);
    };
    setWs(ws);
  }, []);

  const [chatLog, setChatLog] = useState([
    {
      author: "Johannes",
      message: "Hello",
    },
    {
      author: "Vegard",
      message: "Hello",
    },
    {
      author: "Christian",
      message: "Hello to you",
    },
  ]);
  const [message, setMessage] = useState("");

  function handleNewMessage(event) {
    event.preventDefault();
    const chatMessage = { author: username, message };
    ws.send(JSON.stringify(chatMessage));
    setMessage("");
  }

  return (
    <div className={"application"}>
      <header>Chat application {username}</header>
      <main>
        {chatLog.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </main>
      <footer>
        <form onSubmit={handleNewMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>Submit</button>
        </form>
      </footer>
    </div>
  );
}

function Application() {
  const [username, setUsername] = useState("Johannes");

  if (!username) {
    return <Login onLogin={(username) => setUsername(username)} />;
  }

  return <ChatApplication username={username} />;
}

ReactDOM.render(<Application />, document.getElementById("app"));
