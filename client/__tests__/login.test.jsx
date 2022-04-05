import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { LoginPage } from "../pages/loginPage";

describe("login page", () => {
  it("logs in with google", async () => {
    // replace window.location to be able to detect redirects
    delete window.location;
    window.location = new URL("https://www.example.com");

    global.fetch = async () => ({
      ok: true,
      json() {
        return {
          authorization_endpoint: "https://foo.example.com/auth",
        };
      },
    });

    const domElement = document.createElement("div");
    ReactDOM.render(<LoginPage />, domElement);
    await act(async () => {
      await Simulate.click(domElement.querySelector("button"));
    });
    expect(window.location.href).toEqual(
      `https://foo.example.com/auth?response_type=token&client_id=1095582733852-smqnbrhcoiasjjg8q28u0g1k3nu997b0.apps.googleusercontent.com&scope=email+profile&redirect_uri=https%3A%2F%2Fwww.example.com%2Flogin%2Fcallback`
    );
  });
});
