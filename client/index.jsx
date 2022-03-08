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

function FrontPage({ reload }) {
  const { userinfo } = useContext(ProfileContext);

  async function handleLogout() {
    await fetch("/api/login", { method: "delete" });
    reload();
  }

  return (
    <div>
      <h1>Front Page</h1>
      {!userinfo && (
        <div>
          <Link to={"/login"}>Log in</Link>
        </div>
      )}

      {userinfo && (
        <div>
          <Link to={"/profile"}>Profile for {userinfo.name}</Link>
        </div>
      )}
      {userinfo && (
        <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
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
  const { oauth_config } = useContext(ProfileContext);
  useEffect(async () => {
    const { discovery_url, client_id, scope } = oauth_config;
    const discoveryDocument = await fetchJSON(discovery_url);
    const { authorization_endpoint } = discoveryDocument;
    const params = {
      response_type: "token",
      response_mode: "fragment",
      scope,
      client_id,
      redirect_uri: window.location.origin + "/login/callback",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }, []);
  return <h1>Please wait</h1>;
}

function LoginCallback({ reload }) {
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
      reload();
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
  useEffect(loadLoginInfo, []);

  async function loadLoginInfo() {
    setLoading(true);
    setLogin(await fetchJSON("/api/login"));
    setLoading(false);
  }

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
          <Route path={"/"} element={<FrontPage reload={loadLoginInfo} />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/login/callback"}
            element={<LoginCallback reload={loadLoginInfo} />}
          />
        </Routes>
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
