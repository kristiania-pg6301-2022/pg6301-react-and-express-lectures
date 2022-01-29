import express from "express";

const app = express();

app.get("/login", (req, res) => {
  res.json({
    username: "admin"
  })
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
})
