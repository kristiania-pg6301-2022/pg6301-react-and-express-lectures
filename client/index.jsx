import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function LoginAction() {
  return (
    <div>
      <Link to={"/login"}>Log in</Link>
      <Link to={"/register"}>Sign up</Link>
    </div>
  );
}

function FrontPage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await fetch("/api/login");
    setUser(await res.json());
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movies database</h1>
      {user ? <div>Welcome, {user.fullName}</div> : <LoginAction />}
    </div>
  );
}

function Login() {
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
}

function NewUser() {
  return <h1>Create new user</h1>;
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<NewUser />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
