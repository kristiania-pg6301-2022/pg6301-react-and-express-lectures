import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import { ListMovies } from "./pages/listMovies";
import { AddNewMovie } from "./pages/addNewMovie";
import React from "react";

export function Application() {
  async function listMovies() {
    return await fetchJSON("/api/movies");
  }

  async function createMovie(movie) {
    await postJSON("/api/movies", movie);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/movies"}
          element={<ListMovies listMovies={listMovies} />}
        />
        <Route
          path={"/movies/new"}
          element={<AddNewMovie createMovie={createMovie} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
