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
    authorization_endpoint,
    userinfo_endpoint,
    client_id,
  };
}

export function LoginApi() {
  const router = new express.Router();

  router.get("/", async (req, res) => {
    const config = {
      google: await googleConfig(),
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
