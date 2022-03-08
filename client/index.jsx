import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const ProfileContext = React.createContext({
  userinfo: undefined,
});

function FrontPage() {
  async function handleLogout() {
    await fetch("/api/login", { method: "delete" });
  }

  return (
    <div>
      <h1>Front Page</h1>
      <div>
        <Link to={"/login"}>Log in</Link>
      </div>
      <div>
        <Link to={"/profile"}>Profile</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error();
  }
  return await res.json();
}

function Login() {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  useEffect(async () => {
    const discoveryDocument = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    const { authorization_endpoint } = discoveryDocument;
    const params = {
      client_id:
        "34816606807-qttvokcc056kt9bje518mt8mr6dnvisg.apps.googleusercontent.com",
      response_type: "token",
      response_mode: "fragment",
      scope: "openid email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };
    const authorizationUrl =
      authorization_endpoint + "?" + new URLSearchParams(params);
    setAuthorizationUrl(authorizationUrl);
  }, []);
  return (
    <>
      <h1>Login</h1>
      <a href={authorizationUrl}>Login</a>
    </>
  );
}

function LoginCallback() {
  const navigate = useNavigate();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    const res = await fetch("/api/login", {
      method: "post",
      body: new URLSearchParams({ access_token }),
    });
    if (res.ok) {
      navigate("/");
    }
  });

  return <h1>Please wait</h1>;
}

function Profile() {
  const { userinfo } = useContext(ProfileContext);

  return (
    <>
      <h1>
        User profile: {userinfo.name} ({userinfo.email})
      </h1>
      {userinfo.picture && (
        <img src={userinfo.picture} alt={userinfo.name + " profile picture"} />
      )}
    </>
  );
}

function Application() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState();
  useEffect(async () => {
    setLoading(true);
    setLogin(await fetchJSON("/api/login"));
    setLoading(false);
  }, []);
  useEffect(() => {
    console.log({ login });
  }, [login]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContext.Provider value={login}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/login/callback"} element={<LoginCallback />} />
        </Routes>
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
