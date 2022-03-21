import React, { useState } from "react";
import { useLoading } from "./useLoading";

function MovieCard({ movie: { title, plot, poster } }) {
  return (
    <>
      <h3>{title}</h3>
      {poster && <img src={poster} width={100} alt={"Movie poster"} />}
      <div>{plot}</div>
    </>
  );
}

export function ListMovies({ movieApi }) {
  const [country, setCountry] = useState();
  const [countryInput, setCountryInput] = useState("");
  const { loading, error, data } = useLoading(
    async () => movieApi.listMovies(country),
    [country]
  );

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }
  if (error) {
    return (
      <div className="error-message">
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Movies in the database</h1>

      <div>
        <label>Search by country</label>
        <input
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
        />
        <button onClick={() => setCountry(countryInput)}>Search</button>
      </div>

      {data.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
}
