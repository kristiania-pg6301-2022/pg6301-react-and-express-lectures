import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

if (process.env.ATLAS_URL) {
  const client = new MongoClient(process.env.ATLAS_URL);
  client.connect().then(connection => {
    app.get("/api/movies", (req, res) => {
      res.json([
        { title: "Movie 1", plot: "The first movie" },
        { title: "Movie 2", plot: "The second movie" },
      ])
    });
  });
}

app.use(express.static("../client/dist/"));

const server = app.listen(3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
