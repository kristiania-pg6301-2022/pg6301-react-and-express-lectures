import { Router } from "express";

export function MoviesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const { country } = req.query;
    const filter = { year: { $gte: 2000 } };
    if (country) {
      filter.countries = { $in: [country] };
    }
    const movies = await mongoDatabase
      .collection("movies")
      .find(filter)
      .sort({
        metacritic: -1,
      })
      .map(({ title, year, plot, genre, poster }) => ({
        title,
        year,
        plot,
        genre,
        poster,
      }))
      .limit(100)
      .toArray();
    res.json(movies);
  });

  router.post("/", async (req, res) => {
    const { title, year, country, plot } = req.body;
    const countries = [country];
    await mongoDatabase
      .collection("movies")
      .insertOne({ title, countries, year, plot });
    res.sendStatus(200);
  });

  return router;
}
