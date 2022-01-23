import React from "react";
import ReactDOM from "react-dom";
import { Application } from "../application";

describe("application", () => {
  it("renders as expected", () => {
    const element = document.createElement("div");
    ReactDOM.render(<Application who="React" />, element);
    expect(element).toMatchSnapshot();
  });
});
