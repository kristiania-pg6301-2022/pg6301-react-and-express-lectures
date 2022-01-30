import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import { QuizApp } from "../quizApp";

const app = express();
app.use(bodyParser.json());
app.use("/quiz", QuizApp);

describe("The quiz broadcast", () => {
  it("returns a random question", async () => {
    const response = await request(app).get("/quiz/random").expect(200);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      answers: expect.any(Object),
      category: expect.any(String),
    });
    expect(response.body).not.toHaveProperty("correct_answers");
  });

  it("gives 404 on incorrect question", async () => {
    await request(app).post("/quiz/answer").send({ id: -666 }).expect(404);
  });

  it("responds to correct answers", async () => {
    await request(app)
      .post("/quiz/answer")
      .send({ id: 974, answer: "answer_b" })
      .expect({ result: "correct" });
  });

  it("responds to wrong answers", async () => {
    await request(app)
      .post("/quiz/answer")
      .send({ id: 974, answer: "answer_a" })
      .expect({ result: "incorrect" });
  });
});
