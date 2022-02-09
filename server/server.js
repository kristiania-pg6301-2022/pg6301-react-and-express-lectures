import express from "express";
import { randomQuestion } from "./questions.js";
import * as path from "path";

const app = express();

app.get("/question/random", (req, res) => {
  const question = randomQuestion();
  res.json(question);
});

app.use(express.static(path.resolve("../client/dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on http://localhost:${server.address().port}`);
});
