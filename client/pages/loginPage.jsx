import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { MoviesApiContext } from "../moviesApiContext";

export function LoginCallback({ reload }) {
  const { provider } = useParams();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { registerLogin } = useContext(MoviesApiContext);
  useEffect(async () => {
    const { access_token, error, error_description } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    if (error || error_description) {
      setError(`Error: ${error} (${error_description})`);
      return;
    }

    if (!access_token) {
      setError("Missing access_token");
      return;
    }

    await registerLogin(provider, { access_token });
    reload();
    navigate("/");
  });

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

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

function LoginButton({ config, label, provider }) {
  async function handleLogin() {
    const { authorization_endpoint, response_type, client_id } =
      config[provider];
    const parameters = {
      response_type,
      response_mode: "fragment",
      client_id,
      scope: "email profile",
      redirect_uri: `${window.location.origin}/login/${provider}/callback`,
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }

  return (
    <div>
      <button onClick={handleLogin}>{label}</button>
    </div>
  );
}

function StartLogin({ config }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton
        label={"Login with Google"}
        config={config}
        provider={"google"}
      />
      <LoginButton
        label={"Login with ID-porten"}
        config={config}
        provider={"idporten"}
      />
    </div>
  );
}

export function LoginPage({ config, reload }) {
  return (
    <Routes>
      <Route path={"/"} element={<StartLogin config={config} />} />
      <Route
        path={"/:provider/callback"}
        element={<LoginCallback config={config} reload={reload} />}
      />
      <Route path={"/endsession"} element={<EndSession reload={reload} />} />
      <Route path={"*"} element={<StartLogin config={config} />} />
    </Routes>
  );
}
