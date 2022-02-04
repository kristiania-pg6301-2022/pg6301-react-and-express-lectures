import express from "express";

const app = express();

app.get("/login", (req, res) => {
  res.json({
    username: "admin"
  });
})

app.post("/login", (req, res) => {
  // set something so that GET /login returns user name
  console.log("Test");
  res.end()
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
})
