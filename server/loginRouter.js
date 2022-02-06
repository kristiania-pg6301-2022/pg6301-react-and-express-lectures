import express from "express";

const users = [
    {
        username: "admin",
        password: "321terces",
        fullName: "Test Persson"
    }
];


export const LoginRouter = new express.Router();

LoginRouter.get("/", (req, res) => {
    const {username} = req.signedCookies;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.sendStatus(401);
    }
    const {fullName} = user;
    return res.json({fullName, username});
})

LoginRouter.post("/", (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
        res.cookie("username", username, {signed: true});
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
})
