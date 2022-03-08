import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>Front Page</h1>
      <Link to={"/login"}>Log in</Link>
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

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/profile"} element={<h1>User profile</h1>} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login/callback"} element={<h1>Login callback</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
