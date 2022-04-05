import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { LoginCallback, LoginPage } from "../pages/loginPage";
import { MoviesApiContext } from "../moviesApiContext";
import { MemoryRouter } from "react-router-dom";

describe("login page", () => {
  it("redirect to log in with google", async () => {
    // replace window.location to be able to detect redirects
    const location = new URL("https://www.example.com");
    delete window.location;
    window.location = new URL(location);

    const authorization_endpoint = `https://foo.example.com/auth`;
    global.fetch = async () => ({
      ok: true,
      json: () => ({ authorization_endpoint }),
    });

    const domElement = document.createElement("div");
    ReactDOM.render(<LoginPage />, domElement);
    await act(async () => {
      await Simulate.click(domElement.querySelector("button"));
    });
    const client_id = `1095582733852-smqnbrhcoiasjjg8q28u0g1k3nu997b0.apps.googleusercontent.com`;
    const redirect_uri = encodeURIComponent(
      `${location.origin}/login/callback`
    );
    expect(window.location.href).toEqual(
      `${authorization_endpoint}?response_type=token&client_id=${client_id}&scope=email+profile&redirect_uri=${redirect_uri}`
    );
  });

  it("posts received token to server", async () => {
    // replace window.location to simulate returning
    const access_token = `abc`;
    const location = new URL(
      `https://www.example.com#access_token=${access_token}`
    );
    delete window.location;
    window.location = new URL(location);

    const domElement = document.createElement("div");
    const registerLogin = jest.fn();
    act(() => {
      ReactDOM.render(
        <MemoryRouter>
          <MoviesApiContext.Provider value={{ registerLogin }}>
            <LoginCallback />
          </MoviesApiContext.Provider>
        </MemoryRouter>,
        domElement
      );
    });
    expect(registerLogin).toBeCalledWith({ access_token });
  });
});
