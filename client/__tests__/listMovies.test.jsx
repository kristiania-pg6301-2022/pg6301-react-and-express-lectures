import { ListMovies } from "../listMovies";
import React from "react";
import ReactDOM from "react-dom";

const movies = [
  {
    title: "My movie",
    plot: "Something happens",
    poster: "https://example.com/poster1.jpg",
  },
  {
    title: "My other movie",
    plot: "Nothing happens",
    poster: "https://example.com/void1.jpg",
  },
];

describe("list movies", () => {
  it("shows loading screen", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <ListMovies movieApi={{ listMovies: () => movies }} />,
      element
    );
    expect(element.querySelector(".loading-indicator")).not.toBeNull();
    expect(element.innerHTML).toMatchSnapshot();
  });
});
