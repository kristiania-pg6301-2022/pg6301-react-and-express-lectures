import request from "supertest";

import express from "express";
import { LoginRouter } from "../loginRouter";

const app = express();
app.use("/", LoginRouter);

describe("login router", () => {
  it("shows 401 Unauthorized to non-logged in users", () => {
    request(app).get("/").expect(401);
  });
});
