import request from "supertest";
import express from "express";
import { MoviesApi } from "../moviesApi";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
beforeAll(async () => {
  dotenv.config();
  const mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect();
  app.use("/api/movies", MoviesApi(mongoClient.db("unit_tests")));
});

describe("movies api", () => {
  it("lists saved movies", async () => {
    const title = "Movie as of" + new Date();
    await request(app)
      .post("/api/movies")
      .send({ title, year: 2022, plot: "Something happened" })
      .expect(200);

    const listResponse = await request(app).get("/api/movies").expect(200);
    expect(listResponse.body.map(({ title }) => title)).toContain(title);
  });
});
