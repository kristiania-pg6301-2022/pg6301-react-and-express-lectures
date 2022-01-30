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
  const result = isCorrectAnswer(question!, answer) ? "correct" : "incorrect";
  res.json({ result });
});

QuizApp.get("/score", (req, res) => {
  res.send("Dummy");
});
