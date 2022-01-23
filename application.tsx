import * as React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

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

export function Movies() {
  return (
    <Routes>
      <Route path="/" element={<h1>All movies</h1>} />
      <Route path="/new" element={<h1>Add movie</h1>} />
    </Routes>
  );
}

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/movies/*"} element={<Movies />} />
        <Route path={"/*"} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
