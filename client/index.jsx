import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { fetchJSON } from "./fetchJSON";
import { useLoader } from "./useLoader";

const LoginContext = React.createContext(undefined);

export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

export async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

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

function Login() {
  const { discovery_endpoint, client_id, scope } = useContext(LoginContext);
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

    const state = randomString(50);
    window.sessionStorage.setItem("authorization_state", state);
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);

    const parameters = {
      response_type: "code",
      response_mode: "fragment",
      state,
      client_id,
      scope,
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
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { discovery_endpoint, client_id } = useContext(LoginContext);
  useEffect(async () => {
    const { state, code, access_token, error, error_description } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );
    const expectedState = window.sessionStorage.getItem("authorization_state");
    if (state !== expectedState) {
      setError("Invalid callback - state mismatch");
    } else if (error || error_description) {
      setError(error_description || error);
    } else if (code) {
      const grant_type = "authorization_code";
      const code_verifier = window.sessionStorage.getItem("code_verifier");
      const { token_endpoint } = await fetchJSON(discovery_endpoint);
      const parameters = { client_id, grant_type, code, code_verifier };
      const tokenRes = await fetch(token_endpoint, {
        method: "post",
        body: new URLSearchParams(parameters),
      });
      if (!tokenRes.ok) {
        setError(
          `Failed to fetch token: ${tokenRes.status} ${tokenRes.statusText}`
        );
        console.log(await tokenRes.json());
      } else {
        setError(`Okay -- lets try to get the token from ${token_endpoint}!`);
        const { access_token } = await tokenRes.json();
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
          setError(`Failed ${res.status} ${res.statusText}`);
        }
      }
    } else if (access_token) {
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
        setError(`Failed ${res.status} ${res.statusText}`);
      }
    } else {
      setError("Missing access_token");
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error}</div>
        <div>
          <Link to={"/login"}>Try again</Link>
        </div>
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

function Application() {
  const { data, loading, error } = useLoader(() => fetchJSON("/api/config"));
  if (loading) {
    return <div>Please wait...</div>;
  }

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </>
    );
  }

  const { discovery_endpoint, client_id, scope } = data;

  return (
    <LoginContext.Provider value={{ discovery_endpoint, client_id, scope }}>
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
