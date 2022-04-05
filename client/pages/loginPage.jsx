import React, { useContext, useEffect } from "react";
import { fetchJSON } from "../lib/fetchJSON";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MoviesApiContext } from "../moviesApiContext";

export function LoginCallback() {
  const navigate = useNavigate();
  const { registerLogin } = useContext(MoviesApiContext);
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    await registerLogin({ access_token });
    navigate("/");
  });

  return <h1>Please wait...</h1>;
}

function StartLogin() {
  async function handleLoginWithGoogle() {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const parameters = {
      response_type: "token",
      client_id:
        "1095582733852-smqnbrhcoiasjjg8q28u0g1k3nu997b0.apps.googleusercontent.com",
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

export function LoginPage() {
  return (
    <Routes>
      <Route path={"/"} element={<StartLogin />} />
      <Route path={"/callback"} element={<LoginCallback />} />
      <Route path={"*"} element={<StartLogin />} />
    </Routes>
  );
}
