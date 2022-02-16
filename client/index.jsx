import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

class HttpError extends Error {
  constructor(status, statusText) {
    super("HttpError " + statusText);
    this.status = status;
  }
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 204) {
    return undefined;
  } else {
    throw new HttpError(res.status, res.statusText, res.body);
  }
}

function useLoader(loadFn) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(async () => {
    setError(undefined);
    setLoading(true);
    try {
      setData(await loadFn());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);
  return { data, loading, error };
}

function LoginAction() {
  return (
    <div>
      <Link to={"/login"}>Log in</Link>
      <Link to={"/register"}>Sign up</Link>
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
      {data ? <div>Welcome, {data.fullName}</div> : <LoginAction />}
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
