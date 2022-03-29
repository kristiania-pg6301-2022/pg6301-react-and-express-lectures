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

    const parameters = {
      response_type: "token",
      client_id,
      scope,
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
  useEffect(async () => {
    const { access_token, error, error_description } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    if (error || error_description) {
      setError(error_description || error);
    } else if (!access_token) {
      setError("Missing access_token");
    } else {
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
