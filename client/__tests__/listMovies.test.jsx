import { ListMovies } from "../pages/listMovies";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MoviesApiContext } from "../moviesApiContext";

describe("ListMovies component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListMovies />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows movies", async () => {
    const movies = [{ title: "movie 1" }, { title: "movie 2" }];
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <MoviesApiContext.Provider value={{ listMovies: () => movies }}>
          <ListMovies />
        </MoviesApiContext.Provider>,
        domElement
      );
    });

    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["movie 1", "movie 2"]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("shows error message", async () => {
    const domElement = document.createElement("div");
    await act(async () => {
      const listMovies = () => {
        throw new Error("Something went wrong");
      };
      ReactDOM.render(
        <MoviesApiContext.Provider value={{ listMovies }}>
          <ListMovies />
        </MoviesApiContext.Provider>,
        domElement
      );
    });

    expect(domElement.querySelector("#error-text").innerHTML).toEqual(
      "Error: Something went wrong"
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
