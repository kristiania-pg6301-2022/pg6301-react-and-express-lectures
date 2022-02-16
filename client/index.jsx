import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

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

async function postJSON(path, json) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(json),
  });
  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
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

function useSubmit(loadFn) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(undefined);

  async function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    setError(undefined);
    setSubmitting(true);
    try {
      await loadFn();
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  }

  return { handleSubmit, submitting, error };
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
