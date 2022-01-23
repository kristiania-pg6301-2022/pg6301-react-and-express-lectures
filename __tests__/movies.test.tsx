import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Movies } from "../movies";
import { act } from "react-dom/test-utils";

describe("movies", () => {
  it("renders movie list", async () => {
    const element = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Movies />
        </MemoryRouter>,
        element
      );
    });
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
