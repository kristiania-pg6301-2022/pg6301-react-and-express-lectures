import request from "supertest";
import express from "express";
import {users, login} from "../userRouter";
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())
app.use("/login", login);


describe("user router", () => {

  it("fails login with unknown user", async () => {
    const response = await request(app)
      .post("/login")
      .send({username: "nobody", password: "missing"});
    expect(response.status).toEqual(401)
  })

})
