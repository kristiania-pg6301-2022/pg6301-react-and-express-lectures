import * as React from "react";
import { useState } from "react";

export function ListMovies({ movies }: { movies: string[] }) {
  return (
    <div>
      <h1>List movies</h1>
      <ul>
        {movies.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

interface Movie {
  title: string;
  plot: string;
  year: string;
}

export function NewMovieForm({
  onAddMovie,
}: {
  onAddMovie(movie: Movie): void;
}) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [plot, setPlot] = useState("");

  function handleSubmit() {
    onAddMovie({ title, year, plot });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new movie</h1>
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
          <textarea data-testid="plot" />
        </div>
      </div>
    </form>
  );
}
