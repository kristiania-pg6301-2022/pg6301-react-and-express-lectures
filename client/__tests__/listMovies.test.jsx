import { ListMovies } from "../listMovies";

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

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
      ReactDOM.render(<ListMovies listMovies={() => movies} />, domElement);
    });
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
