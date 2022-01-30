import express from "express";

export const QuizApp = express.Router();

QuizApp.get("/score", (req, res) => {
  res.send("Dummy");
});
