import express from "express";
import { AddressInfo } from "net";
import { QuizApp } from "./quizApp";

const app = express();
app.use("/quiz", QuizApp);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `started on http://localhost:${(server.address() as AddressInfo).port}`
  );
});
