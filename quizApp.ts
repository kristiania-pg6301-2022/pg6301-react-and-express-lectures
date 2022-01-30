import express from "express";
import { isCorrectAnswer, Questions, randomQuestion } from "./quiz";

export const QuizApp = express.Router();

QuizApp.get("/random", (req, res) => {
  const { id, question, answers, category } = randomQuestion();
  res.json({ id, question, answers, category });
});

QuizApp.post("/answer", (req, res) => {
  const { id, answer } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  score.answers += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: "correct" });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    res.json({ result: "incorrect" });
  }
});

QuizApp.get("/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : { answers: 0, correct: 0 };
  res.send(score);
});
