import React, { useState } from "react";
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

function ChatApplication({ username }) {
  function handleNewMessage(event) {
    event.preventDefault();
  }

  return (
    <div className={"application"}>
      <header>Chat application {username}</header>
      <main>Here is the main content</main>
      <footer>
        <form onSubmit={handleNewMessage}>
          <input />
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
