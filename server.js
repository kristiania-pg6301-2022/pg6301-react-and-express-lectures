import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const USERS = [];

app.get("/login", (req, res) => {
  const { username } = req.cookies;
  const user = USERS.find(u => u.username === username);
  res.json(user);
});

app.post("/login", (req, res) => {
  const { password, username } = req.body;
  const user = USERS.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.sendStatus(401);
  } else {
    res.cookie("username", user.username).end();
  }
})

app.get("/users", (req, res) => {
  res.json(USERS);
});

app.post("/users", (req, res) => {
  const { username, fullname, password } = req.body;
  if (!username || !fullname || !password) {
    return res.sendStatus(400);
  }
  USERS.push({ username, fullname, password });
  res.sendStatus(200);
});

app.use(express.static("public/"));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
