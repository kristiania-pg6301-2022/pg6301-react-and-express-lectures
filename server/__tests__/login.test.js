import request from "supertest";

import express from "express";
import { LoginRouter } from "../loginRouter";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cookieParser("test secret"));
app.use(bodyParser.json());
app.use("/", LoginRouter);

describe("login router", () => {
  it("shows 401 Unauthorized to non-logged in users", () => {
    request(app).get("/").expect(401);
  });
  it("fails login with invalid credentials", () => {
    request(app)
      .post("/")
      .send({ username: "nobody", password: "special" })
      .expect(401);
  });
  it("logs in with correct credentials", async () => {
    const agent = request.agent(app);
    await agent
      .post("/")
      .send({ username: "admin", password: "321terces" })
      .expect(200);
    await agent
      .get("/")
      .expect({ username: "admin", fullName: "Test Persson" });
  });
});
