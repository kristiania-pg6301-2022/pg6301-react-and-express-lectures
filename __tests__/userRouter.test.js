import request from "supertest";
import express from "express";
import { users, login, userMiddleware } from "../userRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express()
app.use(bodyParser.json())
app.use(cookieParser("dummy secret"));
app.use(userMiddleware);
app.use("/login", login);
app.use("/users", users);


describe("user router", () => {
  beforeAll(async () => {
    await request(app)
      .post("/users")
      .send({username: "somebody", password: "secret", fullname: "Test Persson"})
      .expect(302);
  })

  it("fails login with unknown user", async () => {
    await request(app)
      .post("/login")
      .send({username: "nobody", password: "missing"})
      .expect(401);
  })

  it("requires all user properties", async () => {
    await request(app).post("/users").send({username: "username", password: "pwd"})
      .expect(400);
    await request(app).post("/users").send({username: "username", fullname: "Full Name"})
      .expect(400);
    await request(app).post("/users").send({password: "pwd", fullname: "Full Name"})
      .expect(400);
  })

  it("requires login to view users", async () => {
    await request(app).get("/users").expect(403);
  });

  it("shows users to logged in", async () => {
    const agent = request.agent(app);
    await agent
      .post("/login")
      .send({username: "somebody", password: "secret"})
      .expect(302);
    await agent.get("/users").expect(200);
  })

  it("logs in with registered user", async () => {
    const agent = request.agent(app);
    await agent
      .post("/login")
      .send({username: "somebody", password: "secret"})
      .expect(302);
    const profileResponse = await agent.get("/login");
    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toMatchObject({ fullname: "Test Persson"})
  })

})
