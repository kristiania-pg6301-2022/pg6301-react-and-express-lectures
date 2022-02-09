import express from "express";
import { randomQuestion } from "./questions.js";

const app = express();

app.get("/question/random", (req, res) => {
  const question = randomQuestion();
  res.json(question);
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on http://localhost:${server.address().port}`);
});
