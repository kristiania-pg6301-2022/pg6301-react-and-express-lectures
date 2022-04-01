import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useLoader } from "./useLoader";
import { fetchJSON } from "./fetchJSON";

function FrontPage() {
  return (
    <div>
      <h1>Front Page</h1>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

function randomString(length) {
  const possible = "ABCDEFGIKJKNKLBIELILNLA01234456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

function Login() {
  const { discovery_endpoint, client_id, response_type, scope } =
    useContext(LoginContext);
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);

    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      scope,
      state,
      redirect_uri: window.location.origin + "/login/callback",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <div>
      <h1>Please wait....</h1>
    </div>
  );
}

function LoginCallback() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(async () => {
    const expectedState = window.sessionStorage.getItem("expected_state");
    const { access_token, error, error_description, state } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );

    if (expectedState !== state) {
      setError("Unexpected redirect (state mismatch)");
      return;
    }

    if (error || error_description) {
      setError(`Error: ${error} ${error_description}`);
      return;
    }

    if (!access_token) {
      setError("Missing access token");
      return;
    }

    console.log(access_token);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    if (res.ok) {
      navigate("/");
    } else {
      setError(`Failed POST /api/login: ${res.status} ${res.statusText}`);
    }
  });

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error}</div>
      </div>
    );
  }

  return <h1>Please wait...</h1>;
}

function Profile() {
  const { loading, data, error } = useLoader(async () => {
    return await fetchJSON("/api/login");
  });

  if (loading) {
    return <div>Please wait...</div>;
  }
  if (error) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <div>
      <h1>
        Profile for {data.name} ({data.email})
      </h1>
      <div>
        <img src={data.picture} alt={"Profile picture"} />
      </div>
    </div>
  );
}

const LoginContext = React.createContext();

function Application() {
  const { loading, error, data } = useLoader(() => fetchJSON("/api/config"));
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <LoginContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/login/callback"} element={<LoginCallback />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
