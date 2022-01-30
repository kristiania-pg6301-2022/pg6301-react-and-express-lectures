import express from "express";
import request from "supertest";
import { QuizApp } from "../quizApp";

const app = express();
app.use("/quiz", QuizApp);

describe("The quiz broadcast", () => {
  it("returns a random question", async () => {
    const response = await request(app).get("/quiz/random").expect(200);
    expect(response.body).toMatchObject({
      number: expect.any(Number),
    });
  });
});
