import React, { useContext, useEffect } from "react";
import { fetchJSON } from "../lib/fetchJSON";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MoviesApiContext } from "../moviesApiContext";

export function LoginCallback({ reload }) {
  const navigate = useNavigate();
  const { registerLogin } = useContext(MoviesApiContext);
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    await registerLogin({ access_token });
    reload();
    navigate("/");
  });

  return <h1>Please wait...</h1>;
}

export function EndSession({ reload }) {
  const navigate = useNavigate();
  const { endSession } = useContext(MoviesApiContext);
  useEffect(async () => {
    await endSession();
    reload();
    navigate("/");
  });
  return <h1>Please wait...</h1>;
}

function StartLogin({ config }) {
  const { discovery_endpoint, client_id } = config;
  async function handleLoginWithGoogle() {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

    const parameters = {
      response_type: "token",
      client_id,
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginWithGoogle}>Login with Google</button>
    </div>
  );
}

export function LoginPage({ config, reload }) {
  return (
    <Routes>
      <Route path={"/"} element={<StartLogin config={config} />} />
      <Route
        path={"/callback"}
        element={<LoginCallback config={config} reload={reload} />}
      />
      <Route path={"/endsession"} element={<EndSession reload={reload} />} />
      <Route path={"*"} element={<StartLogin config={config} />} />
    </Routes>
  );
}
