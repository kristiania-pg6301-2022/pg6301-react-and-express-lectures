import * as React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Movies } from "./movies";
import { ApiContext, MovieApi } from "./movieApi";

function FrontPage() {
  return (
    <div>
      <h1>Movie database</h1>

      <ul>
        <li>
          <Link to={"/movies"}>List movies</Link>
        </li>
        <li>
          <Link to={"/movies/new"}>Add movie</Link>
        </li>
      </ul>
    </div>
  );
}

const MOVIES = [
  {
    title: "Gattaca",
    plot: "Does your genes determine your fate?",
    year: 2001,
  },
  {
    title: "Minority Report",
    plot: "Precognitive detectives stop crimes before they happen",
    year: 2005,
  },
];

export function Application() {
  const movieApi: MovieApi = {
    async listMovies() {
      return MOVIES;
    },
  };

  return (
    <ApiContext.Provider value={movieApi}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/movies/*"} element={<Movies />} />
          <Route path={"/*"} element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}
