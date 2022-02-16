import express from "express";

const app = express();

app.get("/api/login", (req, res) => {
  return res.json({ username: "Johannes", fullName: "Johannes Brodwall" });
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on http://localhost:${server.address().port}`);
});
