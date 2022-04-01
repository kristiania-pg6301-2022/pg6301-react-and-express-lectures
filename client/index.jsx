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
import { randomString } from "./randomString";

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

async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function Login() {
  const { discovery_endpoint, client_id, response_type, scope } =
    useContext(LoginContext);
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);

    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      scope,
      state,
      code_challenge: await sha256(code_verifier),
      code_challenge_method: "S256",
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
  const { discovery_endpoint, client_id } = useContext(LoginContext);
  useEffect(async () => {
    const expectedState = window.sessionStorage.getItem("expected_state");
    const { access_token, error, error_description, state, code } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );

    let accessToken = access_token;

    if (expectedState !== state) {
      setError("Unexpected redirect (state mismatch)");
      return;
    }

    if (error || error_description) {
      setError(`Error: ${error} ${error_description}`);
      return;
    }

    if (code) {
      const { token_endpoint } = await fetchJSON(discovery_endpoint);
      const code_verifier = window.sessionStorage.getItem("code_verifier");

      const tokenResponse = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id,
          code_verifier,
        }),
      });
      if (tokenResponse.ok) {
        const { access_token } = await tokenResponse.json();
        accessToken = access_token;
      } else {
        setError(`token response ${await tokenResponse.text()}`);
        return;
      }
    }

    if (!accessToken) {
      setError("Missing access token");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });
    if (res.ok) {
      navigate("/");
    } else {
      setError(`Failed POST /api/login: ${res.status} ${res.statusText}`);
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error}</div>
        <Link to={"/"}>Front page</Link>
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
        Profile for {data.name} ({data.email}) {data.pid}
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
