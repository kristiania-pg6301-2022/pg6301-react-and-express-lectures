import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ListMovies } from "./listMovies";

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

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

function AddNewMovie() {
  return (
    <form>
      <h1>Add new movie</h1>
    </form>
  );
}

function Application() {
  async function listMovies() {
    return await fetchJSON("/api/movies");
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route
          path={"/movies"}
          element={<ListMovies listMovies={listMovies} />}
        />
        <Route path={"/movies/new"} element={<AddNewMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
