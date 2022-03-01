import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

if (process.env.ATLAS_URL) {
  const client = new MongoClient(process.env.ATLAS_URL);
  client.connect().then(connection => {
    const database = connection.db("sample_mflix");
    app.get("/api/movies", async (req, res) => {
      const result = await database.collection("movies").find().limit(100).toArray();
      res.json(result)
    });
  });
}

app.use(express.static("../client/dist/"));

const server = app.listen(3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
