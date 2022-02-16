import express from "express";

const users = [
  {
    username: "administrator",
    password: "321terces",
    fullName: "Test Person",
  },
];

export function requestUser() {
  return (req, res, next) => {
    const { username } = req.signedCookies;
    if (username) {
      req.user = users.find((u) => u.username === username);
    }
    next();
  };
}

export function createLoginRouter() {
  const login = express.Router();
  login.get("/", (req, res) => {
    if (!req.user) {
      return res.sendStatus(204);
    }
    const { username, fullName } = req.user;
    return res.json({ username, fullName });
  });

  login.post("/", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return res.sendStatus(401);
    }
    res.cookie("username", username, { signed: true });
    res.sendStatus(200);
  });

  login.delete("/", (req, res) => {
    res.clearCookie("username");
    res.sendStatus(204);
  });

  return login;
}
