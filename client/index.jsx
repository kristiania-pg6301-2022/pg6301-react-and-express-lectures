import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { fetchJSON, postJSON } from "./lib/http";
import { useLoader } from "./lib/useLoader";
import { useSubmit } from "./lib/useSubmit";

function LoginAction() {
  return (
    <div>
      <Link to={"/login"}>Log in</Link>
      <Link to={"/register"}>Sign up</Link>
    </div>
  );
}

function UserView({ user: { fullName } }) {
  const {
    error,
    handleSubmit: handleLogout,
    submitting,
  } = useSubmit(async () => {
    await fetchJSON("/api/login", {
      method: "DELETE",
    });
  });
  return (
    <div>
      Welcome, {fullName}
      {error && <ErrorView error={error} />}
      <div>
        <button onClick={handleLogout} disabled={submitting}>
          Log out
        </button>
      </div>
    </div>
  );
}

function FrontPage() {
  const { data, loading, error } = useLoader(
    async () => await fetchJSON("/api/login")
  );

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movies database</h1>
      {data ? <UserView user={data} /> : <LoginAction />}
    </div>
  );
}

function ErrorView({ error }) {
  return (
    <div>
      <span
        style={{ border: "1px solid red", background: "pink", margin: "auto" }}
      >
        {error.toString()}
      </span>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, submitting, error } = useSubmit(async () => {
    await postJSON("/api/login", { username, password });
    navigate("/");
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      {error && <ErrorView error={error} />}
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
        <button disabled={submitting}>Log in</button>
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
