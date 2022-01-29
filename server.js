import express from "express";

const app = express();

app.get("/login", (req, res) => {
  res.json({
    username: "admin"
  })
})

const USERS = [];

app.post("/users", (req, res) => {
  const {username, fullname, password} = req.body;
  USERS.push({username, fullname, password});
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
})
