import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
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
});
