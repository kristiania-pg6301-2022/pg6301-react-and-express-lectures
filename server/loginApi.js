import express from "express";
import fetch from "node-fetch";

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

async function googleConfig() {
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const { userinfo_endpoint, authorization_endpoint } = await fetchJSON(
    discovery_endpoint
  );
  return {
    response_type: "token",
    authorization_endpoint,
    scope: "profile email",
    userinfo_endpoint,
    client_id,
  };
}

async function idportenConfig() {
  const discovery_endpoint =
    "https://oidc-ver1.difi.no/idporten-oidc-provider/.well-known/openid-configuration";
  const client_id = process.env.IDPORTEN_CLIENT_ID;
  const { userinfo_endpoint, authorization_endpoint, token_endpoint } =
    await fetchJSON(discovery_endpoint);
  return {
    response_type: "code",
    authorization_endpoint,
    userinfo_endpoint,
    token_endpoint,
    client_id,
    scope: "openid",
    code_challenge_method: "S256",
  };
}

export function LoginApi() {
  const router = new express.Router();

  router.get("/", async (req, res) => {
    const config = {
      google: await googleConfig(),
      idporten: await idportenConfig(),
    };
    const response = { config, user: {} };

    const access_token = req.signedCookies["google_access_token"];
    if (access_token) {
      const userinfo = await fetch(config.google.userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (userinfo.ok) {
        response.user.google = await userinfo.json();
      }
    }
    res.json(response);
  });

  router.delete("/", (req, res) => {
    res.clearCookie("google_access_token");
    res.sendStatus(200);
  });

  router.post("/:provider", (req, res) => {
    const { provider } = req.params;
    const { access_token } = req.body;
    res.cookie(`${provider}_access_token`, access_token, { signed: true });
    res.sendStatus(200);
  });
  return router;
}
