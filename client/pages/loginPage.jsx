import React from "react";

export function LoginPage() {
  function handleLoginWithGoogle() {
    window.location.href = "https://foo.example.com";
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginWithGoogle}>Login with Google</button>
    </div>
  );
}
