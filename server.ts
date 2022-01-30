import express from "express";
import { AddressInfo } from "net";
import { QuizApp } from "./quizApp";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/quiz", QuizApp);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `started on http://localhost:${(server.address() as AddressInfo).port}`
  );
});
