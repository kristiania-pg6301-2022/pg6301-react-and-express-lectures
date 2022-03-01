import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

if (process.env.ATLAS_URL) {
  const client = new MongoClient(process.env.ATLAS_URL);
  client.connect().then((connection) => {
    const database = connection.db("sample_mflix");
    app.get("/api/movies", async (req, res) => {
      const result = await database
        .collection("movies")
        .find({
          countries: { $in: ["Norway"] },
          year: { $gt: 1999 },
        })
        .sort({ year: -1 })
        .project({
          title: 1,
          plot: 2,
          fullplot: 3,
          directors: 4,
          countries: 5,
          poster: 6,
          year: 7,
        })
        .limit(10)
        .toArray();
      res.json(result);
    });

    app.post("/api/movies", async (req, res) => {
      const { title, year, directors, fullplot, countries } = req.body;
      const result = await database.collection("movies").insertOne({
        title,
        year,
        directors,
        fullplot,
        countries,
      });
      console.log({ result });
      res.sendStatus(200);
    });
  });
}

app.use(express.static("../client/dist/"));

const server = app.listen(3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
