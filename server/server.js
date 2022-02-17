import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as path from "path";
import { isCorrectAnswer, Questions, randomQuestion } from "./questions.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/quiz/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : {
        answered: 0,
        correct: 0,
      };

  res.json(score);
});

app.get("/quiz/random", (req, res) => {
  const { id, question, answers } = randomQuestion();
  res.json({ id, question, answers });
});

app.post("/quiz/answer", (req, res) => {
  const { id, answer } = req.body;
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : {
        answered: 0,
        correct: 0,
      };
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }

  score.answered += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "correct" });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "incorrect" });
  }
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
