import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { ApiContext, Movie } from "./movieApi";

function ListMovies() {
  const movieApi = useContext(ApiContext);
  const [movies, setMovies] = useState<Movie[] | undefined>();
  async function loadMovies() {
    setMovies(await movieApi.listMovies());
  }
  useEffect(() => {
    loadMovies();
  }, []);

  if (!movies) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>All movies</h1>
      {movies.map((m) => (
        <div key={m.title}>{m.title}</div>
      ))}
    </div>
  );
}

export function Movies() {
  return (
    <Routes>
      <Route path="/" element={<ListMovies />} />
      <Route path="/new" element={<h1>Add movie</h1>} />
    </Routes>
  );
}
