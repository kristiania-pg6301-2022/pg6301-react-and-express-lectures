import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Movies } from "../movies";
import { act } from "react-dom/test-utils";
import { ApiContext, MovieApi } from "../movieApi";

const TEST_MOVIES = [
  {
    title: "Gattaca",
    plot: "Does your genes determine your fate?",
    year: 2001,
  },
  {
    title: "Minority Report",
    plot: "Precognitive detectives stop crimes before they happen",
    year: 2005,
  },
];

const movieApi: MovieApi = {
  async listMovies() {
    return TEST_MOVIES;
  },
};

describe("movies", () => {
  it("renders movie list", async () => {
    const element = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <ApiContext.Provider value={movieApi}>
          <MemoryRouter>
            <Movies />
          </MemoryRouter>
        </ApiContext.Provider>,
        element
      );
    });
    expect(element).toMatchSnapshot();
  });
  it("renders new movie form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/new"]}>
        <Movies />
      </MemoryRouter>,
      element
    );
    expect(element).toMatchSnapshot();
  });
});
