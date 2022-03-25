import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { MoviesApi } from "../moviesApi";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  await database.collection("movies").deleteMany({});
  app.use("/api/movies", MoviesApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("movies api", () => {
  it("adds a new movie", async () => {
    await request(app)
      .post("/api/movies")
      .send({
        title: "My Test Movie",
        country: "Ukraine",
        year: 2020,
      })
      .expect(200);
    expect(
      (await request(app).get("/api/movies").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("My Test Movie");
  });
});
