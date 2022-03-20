import request from "supertest";

describe("movies api", () => {
  it("lists saved movies", async () => {
    const title = "Movie as of" + new Date();
    await request(app)
      .post("/api/movies")
      .send({ title, year: 2022, plot: "Something happened" })
      .expect(200);

    const listResponse = await request(app).get("/api/movies").expect(200);
    expect(listResponse.body.map(({ title }) => title)).toContain(title);
  });
});
