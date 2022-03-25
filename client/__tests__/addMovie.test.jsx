import { AddNewMovie } from "../addNewMovie";
import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";

describe("add movie component", () => {
  it("shows movies form", () => {
    const element = document.createElement("div");
    ReactDOM.render(<AddNewMovie />, element);
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Title:", "Year:", "Country:", "Plot:"]);
  });

  it("adds movie on submit", () => {
    const createMovie = jest.fn();
    const title = "Test movie";
    const element = document.createElement("div");
    ReactDOM.render(<AddNewMovie createMovie={createMovie} />, element);
    Simulate.change(element.querySelector("form input:nth-of-type(1)"), {
      target: { value: title },
    });
    Simulate.submit(element.querySelector("form"));
    expect(createMovie).toBeCalledWith({
      title,
    });
  });
});
