import { Route, Routes, useNavigate } from "react-router-dom";
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

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [plot, setPlot] = useState("");
  const movieApi = useContext(ApiContext);
  const navigate = useNavigate();
  async function handleSubmit() {
    await movieApi.addMovie({ title, year, plot });
    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add movie</h1>
      <div>
        Title:{" "}
        <input
          data-testid="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        Year:{" "}
        <input
          data-testid="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div>
        Plot:
        <div>
          <textarea
            data-testid="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export function Movies() {
  return (
    <Routes>
      <Route path="/" element={<ListMovies />} />
      <Route path="/new" element={<AddMovie />} />
    </Routes>
  );
}
