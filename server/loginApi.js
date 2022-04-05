import express from "express";
import fetch from "node-fetch";

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

export function LoginApi() {
  const discovery_endpoint =
    "https://accounts.google.com/.well-known/openid-configuration";
  const client_id = process.env.CLIENT_ID;

  const router = new express.Router();

  router.get("/", async (req, res) => {
    const { userinfo_endpoint, authorization_endpoint } = await fetchJSON(
      discovery_endpoint
    );
    const { access_token } = req.signedCookies;
    const response = {
      config: {
        google: {
          authorization_endpoint,
          client_id,
        },
      },
    };
    if (access_token) {
      const userinfo = await fetch(userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (userinfo.ok) {
        response.user = await userinfo.json();
      }
    }
    res.json(response);
  });

  router.delete("/", (req, res) => {
    res.clearCookie("access_token");
    res.sendStatus(200);
  });

  router.post("/", (req, res) => {
    const { access_token } = req.body;
    res.cookie("access_token", access_token, { signed: true });
    res.sendStatus(200);
  });
  return router;
}
