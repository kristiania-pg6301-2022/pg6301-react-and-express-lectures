import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {LoginRouter} from "./loginRouter.js";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(express.static("../client/dist"));

app.use("/login", LoginRouter);


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on http://localhost:${server.address().port}`)
})
