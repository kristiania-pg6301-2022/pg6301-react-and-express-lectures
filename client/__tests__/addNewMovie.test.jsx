import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { AddNewMovie } from "../addNewMovie";

describe("add movie", () => {
  it("shows form", async () => {
    const element = document.createElement("div");
    await act(async () => ReactDOM.render(<AddNewMovie />, element));
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
      ReactDOM.render(<AddNewMovie movieApi={{ createMovie }} />, element)
    );

    Simulate.change(element.querySelector("form input"), {
      target: { value: "Movie Title" },
    });
    Simulate.submit(element.querySelector("form"));

    expect(createMovie).toBeCalledWith({
      title: "Movie Title",
      year: "",
      plot: "",
      country: "",
    });
  });
});
