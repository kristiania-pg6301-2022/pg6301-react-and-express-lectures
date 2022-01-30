import express from "express";

export const login = new express.Router();
export const users = new express.Router();

login.get("/", (req, res) => {
  const { username } = req.signedCookies;
  const user = USERS.find((u) => u.username === username);
  res.json(user);
});

login.post("/", (req, res) => {
  const { password, username } = req.body;
  const user = USERS.find((u) => u.username === username);
  if (!user || user.password !== password) {
    return res.sendStatus(401);
  } else {
    res.cookie("username", user.username, { signed: true }).redirect("/");
  }
});

users.get("/", (req, res) => {
  if (!req.user) {
    return res.sendStatus(403);
  }
  res.json(USERS);
});

users.post("/", (req, res) => {
  const { username, fullname, password } = req.body;
  if (!username || !fullname || !password) {
    return res.sendStatus(400);
  }
  USERS.push({ username, fullname, password });
  res.redirect("/");
});
export const USERS = [];

export function userMiddleware(req, res, next) {
  req.user = USERS.find((u) => u.username === req.signedCookies?.username);
  next();
}
