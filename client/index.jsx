import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        Username{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password{" "}
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/*"} element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
