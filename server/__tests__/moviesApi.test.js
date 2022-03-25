import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { MoviesApi } from "../moviesApi";
import dotenv from "dotenv";

dotenv.config();

const app = express();

beforeAll(async () => {
  const mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect();
  app.use("/api/movies", MoviesApi(mongoClient.db("sample_mflix")));
});

describe("movies api", () => {
  it("lists existing movies", async () => {
    expect(
      (await request(app).get("/api/movies").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("Maidan");
  });
});
