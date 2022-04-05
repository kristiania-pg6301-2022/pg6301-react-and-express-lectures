import React from "react";
import { fetchJSON } from "../lib/fetchJSON";

export function LoginPage() {
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
