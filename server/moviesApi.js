import express from "express";

const movies = [
  {
    title: "Movie 1",
  },
  {
    title: "Movie 2",
  },
];

export function MoviesApi(db) {
  const api = express.Router();

  api.get("/", async (req, res) => {
    const movies = await db
      .collection("movies")
      .find({})
      .map(({ title, plot }) => ({ title, plot }))
      .toArray();
    res.json(movies);
  });

  api.post("/", (req, res) => {
    const { title, plot, year } = req.body;
    movies.push({ title, plot, year });
    res.sendStatus(204);
  });
  return api;
}
