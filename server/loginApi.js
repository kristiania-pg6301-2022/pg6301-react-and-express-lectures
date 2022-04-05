import express from "express";

export function LoginApi() {
  const router = new express.Router();
  router.post("/", (req, res) => {
    const { access_token } = req.body;
    res.cookie("access_token", access_token, { signed: true });
    res.sendStatus(200);
  });
  return router;
}
