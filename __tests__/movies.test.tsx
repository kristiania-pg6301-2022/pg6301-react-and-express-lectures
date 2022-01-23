import React from "react";
import ReactDOM from "react-dom";
import { Movies } from "../application";
import { MemoryRouter } from "react-router-dom";

describe("movies", () => {
  it("renders movie list", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>,
      element
    );
    expect(element).toMatchSnapshot();
  });
  it("renders new movie form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter initialEntries={["/new"]}>
        <Movies />
      </MemoryRouter>,
      element
    );
    expect(element).toMatchSnapshot();
  });
});
