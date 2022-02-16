import express from "express";

import * as path from "path";

const app = express();

app.get("/api/login", (req, res) => {
  return res.json({ username: "Johannes", fullName: "Johannes Brodwall" });
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);
});
