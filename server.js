import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const USERS = [];

app.use((req, res, next) => {
  console.log("This is happening before a request");
  req.user = USERS.find(u => u.username === req.signedCookies.username);
  next();
  console.log("This is happening after a request");
})

app.get("/login", (req, res) => {
  const { username } = req.signedCookies;
  const user = USERS.find(u => u.username === username);
  res.json(user);
});

app.post("/login", (req, res) => {
  const { password, username } = req.body;
  const user = USERS.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.sendStatus(401);
  } else {
    res.cookie("username", user.username, {signed: true}).end();
  }
})

app.get("/users", (req, res) => {
  console.log("In the request", req.user);
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
