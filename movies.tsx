import { Route, Routes } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";

interface Movie {
  title: string;
}

function ListMovies({ listMovies }: { listMovies: () => Promise<Movie[]> }) {
  const [movies, setMovies] = useState<Movie[] | undefined>();
  async function loadMovies() {
    setMovies(await listMovies());
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

export function Movies() {
  async function listMovies(): Promise<Movie[]> {
    return MOVIES;
  }

  return (
    <Routes>
      <Route path="/" element={<ListMovies listMovies={listMovies} />} />
      <Route path="/new" element={<h1>Add movie</h1>} />
    </Routes>
  );
}
