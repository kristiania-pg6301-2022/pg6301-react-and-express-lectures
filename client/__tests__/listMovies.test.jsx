import { ListMovies } from "../listMovies";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

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
      <ListMovies
        movieApi={{
          listMovies: () =>
            new Promise(() => {
              // do nothing
            }),
        }}
      />,
      element
    );
    expect(element.querySelector(".loading-indicator")).not.toBeNull();
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("shows movie list", async () => {
    const element = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <ListMovies
          movieApi={{
            listMovies: () => new Promise((resolve) => resolve(movies)),
          }}
        />,
        element
      );
    });
    expect(element.querySelector("h3").innerHTML).toEqual(movies[0].title);
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("shows error message", async () => {
    const element = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <ListMovies
          movieApi={{
            listMovies: () =>
              new Promise((resolve, reject) => {
                reject(new Error("Failed to fetch"));
              }),
          }}
        />,
        element
      );
    });
    expect(element.querySelector(".error-message").innerHTML).toContain(
      "Failed to fetch"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
