import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { AddNewMovie } from "../addNewMovie";
import { MemoryRouter } from "react-router-dom";
import { MovieApiContext } from "../movieApiContext";

describe("add movie", () => {
  it("shows form", async () => {
    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <AddNewMovie />
        </MemoryRouter>,
        element
      )
    );
    expect(element.innerHTML).toMatchSnapshot();

    const inputLabels = Array.from(
      element.querySelectorAll("form label strong")
    ).map((label) => label.innerHTML);
    expect(inputLabels).toEqual(["Title: ", "Year: ", "Country: ", "Plot: "]);
  });

  it("submits form", async () => {
    const createMovie = jest.fn();

    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MemoryRouter>
          <MovieApiContext.Provider value={{ createMovie }}>
            <AddNewMovie />
          </MovieApiContext.Provider>
        </MemoryRouter>,
        element
      )
    );

    Simulate.change(element.querySelector("form div:nth-of-type(1) input"), {
      target: { value: "Movie Title" },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
      target: { value: "2022" },
    });
    Simulate.submit(element.querySelector("form"));

    expect(createMovie).toBeCalledWith({
      title: "Movie Title",
      year: 2022,
      plot: "",
      country: "",
    });
  });
});
