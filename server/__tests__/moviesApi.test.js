import request from "supertest";
import express from "express";
import { MoviesApi } from "../moviesApi";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
let mongoClient;
beforeAll(async () => {
  dotenv.config();
  mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect();
  const database = mongoClient.db("unit_tests");
  await database.collection("movies").deleteMany({});
  app.use("/api/movies", MoviesApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("movies api", () => {
  it("lists saved movies", async () => {
    const title = "Ukrainian movie as of " + new Date();
    await request(app)
      .post("/api/movies")
      .send({ title, year: 2022, country: "Ukraine" })
      .expect(200);

    const listResponse = await request(app).get("/api/movies").expect(200);
    expect(listResponse.body.map(({ title }) => title)).toContain(title);
  });

  it("filters movies by country", async () => {
    const title = "Norwegian movie as of " + new Date();
    await request(app)
      .post("/api/movies")
      .send({ title, year: 2022, country: "Norway" })
      .expect(200);

    expect(
      (await request(app).get("/api/movies?country=Norway")).body.map(
        ({ title }) => title
      )
    ).toContain(title);
    expect(
      (await request(app).get("/api/movies?country=USA")).body.map(
        ({ title }) => title
      )
    ).not.toContain(title);
  });
});
