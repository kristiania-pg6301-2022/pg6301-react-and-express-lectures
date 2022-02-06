import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));


const users = [
    {
        username: "admin",
        password: "321terces",
        fullName: "Test Persson"
    }
];

app.use(express.static("public"));

app.get("/login", (req, res) => {
    const {username} = req.signedCookies;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.sendStatus(401);
    }
    const {fullName} = user;
    return res.json({fullName, username});
})

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
        res.cookie("username", username, {signed: true});
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`)
})
