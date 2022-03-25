import { AddNewMovie } from "../addNewMovie";
import React from "react";
import ReactDOM from "react-dom";

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
});
