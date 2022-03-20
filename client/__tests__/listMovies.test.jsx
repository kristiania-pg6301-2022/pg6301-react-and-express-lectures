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

async function renderListMovies(listMovies) {
  const element = document.createElement("div");
  await act(async () =>
    ReactDOM.render(<ListMovies movieApi={{ listMovies }} />, element)
  );
  return element;
}

describe("list movies", () => {
  it("shows loading screen", async () => {
    const element = await renderListMovies(() => new Promise(() => {}));
    expect(element.querySelector(".loading-indicator")).not.toBeNull();
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("shows movie list", async () => {
    const element = await renderListMovies(
      () => new Promise((resolve) => resolve(movies))
    );
    expect(element.querySelector("h3").innerHTML).toEqual(movies[0].title);
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("shows error message", async () => {
    const element = await renderListMovies(
      () =>
        new Promise((resolve, reject) => {
          reject(new Error("Failed to fetch"));
        })
    );
    expect(element.querySelector(".error-message").innerHTML).toContain(
      "Failed to fetch"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
