import { ListMovies } from "../listMovies";

import React from "react";
import ReactDOM from "react-dom";

describe("ListMovies component", () => {
  it("shows loading screen", () => {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListMovies />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
