import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


const app = express();
app.use(cookieParser());
app.use(bodyParser.json());


app.get("/login", (req, res) => {
  const { username } = req.cookies;
  const user = users.find(u => u.username === username);
  const {fullName} = user;
  res.json({ username, fullName });
})

const users = [
  {
    username: "administrator", password: "321terces", fullName: "Test Persson"
  }
]


app.post("/login", (req, res) => {
  // set a cookie
  // read the cookie in /login

  const { password, username } = req.body;

  if (users.find(u => u.username === username).password === password) {
    res.cookie("username", username);
    res.sendStatus(200)
  } else {
    res.send(401);
  }
})

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
})
