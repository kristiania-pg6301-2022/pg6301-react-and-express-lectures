import { Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { LoginPage } from "../pages/loginPage";

describe("login page", () => {
  it("logs in with google", () => {
    // replace window.location to be able to detect redirects
    delete window.location;
    window.location = new URL("https://www.example.com");

    const domElement = document.createElement("div");
    ReactDOM.render(<LoginPage />, domElement);
    Simulate.click(domElement.querySelector("button"));
    expect(window.location.href).toEqual("https://foo.example.com/");
  });
});
