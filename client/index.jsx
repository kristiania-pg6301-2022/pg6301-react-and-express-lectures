import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListMovies } from "./listMovies";
import { fetchJSON } from "./fetchJSON";
import { AddNewMovie } from "./addNewMovie";

function FrontPage() {
  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        <li>
          <Link to={"/movies"}>List movies</Link>
        </li>
        <li>
          <Link to={"/movies/new"}>Add new movie</Link>
        </li>
      </ul>
    </div>
  );
}

function Application() {
  const movieApi = {
    async listMovies() {
      return fetchJSON("/api/movies?country=Testing");
    },
    async createMovie(movie) {
      fetch("/api/movies", {
        method: "post",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/movies"} element={<ListMovies movieApi={movieApi} />} />
        <Route
          path={"/movies/new"}
          element={<AddNewMovie movieApi={movieApi} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
