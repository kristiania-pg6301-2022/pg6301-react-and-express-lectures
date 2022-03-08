import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded());
app.use(cookieParser(process.env.COOKIE_SECRET));

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.get("/api/login", async (req, res) => {
  const { access_token } = req.signedCookies;
  const discoveryDocument = await fetchJSON(
    "https://accounts.google.com/.well-known/openid-configuration"
  );
  const { userinfo_endpoint } = discoveryDocument;
  try {
    const userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.json({ userinfo }).status(200);
  } catch (error) {
    console.error({ error });
    res.sendStatus(401);
  }
});

app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(200);
});

app.delete("/api/login", (req, res) => {
  res.clearCookie("access_token");
  res.sendStatus(200);
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
