import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Movies } from "../movies";
import { act, Simulate } from "react-dom/test-utils";
import { ApiContext, MovieApi } from "../movieApi";

const TEST_MOVIES = [
  {
    title: "Gattaca",
    plot: "Does your genes determine your fate?",
    year: "2001",
  },
  {
    title: "Minority Report",
    plot: "Precognitive detectives stop crimes before they happen",
    year: "2005",
  },
];

async function listMovies() {
  return TEST_MOVIES;
}

const defaultMovieApi: MovieApi = {
  listMovies,
  addMovie: jest.fn(),
};

async function renderInContext(
  child: JSX.Element,
  { initialPath, movieApi }: { initialPath?: string; movieApi?: MovieApi } = {}
) {
  const element = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(
      <ApiContext.Provider value={movieApi || defaultMovieApi}>
        <MemoryRouter initialEntries={initialPath ? [initialPath] : undefined}>
          {child}
        </MemoryRouter>
      </ApiContext.Provider>,
      element
    );
  });
  return element;
}

async function simulateChange(
  element: HTMLElement,
  selector: string,
  value: string
) {
  const eventData: any = { target: { value: value } };
  const selectedElement = element.querySelector(selector);
  if (selectedElement) {
    await act(async () => {
      await Simulate.change(selectedElement, eventData);
    });
  } else {
    fail("Could not match " + selector);
  }
}

describe("movies", () => {
  it("renders movie list", async () => {
    const element = await renderInContext(<Movies />);
    expect(element).toMatchSnapshot();
  });
  it("renders new movie form", async () => {
    const element = await renderInContext(<Movies />, { initialPath: "/new" });
    expect(element).toMatchSnapshot();
  });
  it("adds movie", async () => {
    const addMovie = jest.fn();
    const element = await renderInContext(<Movies />, {
      initialPath: "/new",
      movieApi: {
        listMovies,
        addMovie,
      },
    });
    await simulateChange(element, "input[data-testid=title]", "Some movie");
    await simulateChange(element, "input[data-testid=year]", "1999");
    await simulateChange(
      element,
      "textarea[data-testid=plot]",
      "Something happens"
    );
    await act(async () => {
      await Simulate.submit(element.querySelector("form")!);
    });
    expect(addMovie).toBeCalledWith({
      title: "Some movie",
      plot: "Something happens",
      year: "1999",
    });
  });
});
