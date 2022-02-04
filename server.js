import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  const { username } = req.signedCookies;
  req.user = users.find(u => u.username === username);
  console.log("before");
  next();
  console.log("after");
})
app.use(express.static("public"));


const users = [
  {
    username: "administrator", password: "321terces", fullName: "Test Persson"
  },
  {
    username: "dummyuser", password: "dummy", fullName: "Noen André"
  }
]

app.get("/login", (req, res) => {
  console.log("Inside");
  if (!req.user) {
    return res.sendStatus(401);
  }
  const {fullName, username} = req.user;
  res.json({ username, fullName });
})

app.post("/login", (req, res) => {
  // set a cookie
  // read the cookie in /login

  const { password, username } = req.body;

  const user = users.find(u => u.username === username);
  if (user && user.password === password) {
    res.cookie("username", username, { signed: true });
    res.sendStatus(200)
  } else {
    res.send(401);
  }
})

app.get("/users", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  res.json(users.map(({ fullName, username }) => ({ username, fullName})));
})

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
})
