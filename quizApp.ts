import express from "express";
import { randomQuestion } from "./quiz";

export const QuizApp = express.Router();

QuizApp.get("/random", (req, res) => {
  const { id, question, answers, category } = randomQuestion();
  res.json({ id, question, answers, category });
});

QuizApp.post("/answer", (req, res) => {
  res.json({ result: "correct" });
});

QuizApp.get("/score", (req, res) => {
  res.send("Dummy");
});
