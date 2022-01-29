import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/login", (req, res) => {
  res.json({
    username: "admin"
  })
})

const USERS = [];

app.get("/users", (req, res) => {
  res.json(USERS);
})

app.post("/users", (req, res) => {
  const {username, fullname, password} = req.body;
  USERS.push({username, fullname, password});
  res.sendStatus(200)
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
})
