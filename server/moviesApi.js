import express from "express";

export const MoviesApi = express.Router();

const movies = [
  {
    title: "Movie 1",
  },
  {
    title: "Movie 2",
  },
];

MoviesApi.get("/", (req, res) => {
  res.json(movies);
});

MoviesApi.post("/", (req, res) => {
  const { title, plot, year } = req.body;
  movies.push({ title, plot, year });
  res.sendStatus(204);
});
