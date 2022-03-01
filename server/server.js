import express from "express";

const app = express();

app.get("/api/movies", (req, res) => {
  res.json([
    { title: "Movie 1", plot: "The first movie" },
    { title: "Movie 2", plot: "The second movie" },
  ])
})


app.use(express.static("../client/dist/"));

const server = app.listen(3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
