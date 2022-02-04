import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.get("/login", (req, res) => {
  const user = users.find(u => u.username === req.cookies.username);
  const {fullName, username} = user;
  res.json({ username, fullName });
})

const users = [
  {
    username: "administrator", password: "321terces", fullName: "Test Persson"
  },
  {
    username: "dummyuser", password: "dummy", fullName: "Noen André"
  }
]


app.post("/login", (req, res) => {
  // set a cookie
  // read the cookie in /login

  const { password, username } = req.body;

  const user = users.find(u => u.username === username);
  if (user && user.password === password) {
    res.cookie("username", username);
    res.sendStatus(200)
  } else {
    res.send(401);
  }
})

app.use(express.static("public"));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
})
