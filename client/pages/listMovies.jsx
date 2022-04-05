import React, { useContext, useState } from "react";
import { useLoading } from "../useLoading";
import { MoviesApiContext } from "../moviesApiContext";

function MovieCard({ movie: { title, plot, poster } }) {
  return (
    <>
      <h3>{title}</h3>
      {poster && <img src={poster} width={100} alt={"Movie poster"} />}
      <div>{plot}</div>
    </>
  );
}

export function ListMovies() {
  const { listMovies } = useContext(MoviesApiContext);
  const [country, setCountry] = useState(undefined);
  const [countryQuery, setCountryQuery] = useState("");
  const { loading, error, data } = useLoading(
    async () => await listMovies({ country }),
    [country]
  );

  function handleSubmitQuery(e) {
    e.preventDefault();
    setCountry(countryQuery);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Movies in the database</h1>

      <div>
        <form onSubmit={handleSubmitQuery}>
          <label>
            Country:
            <input
              id="country-query"
              value={countryQuery}
              onChange={(e) => setCountryQuery(e.target.value)}
            />
            <button>Filter</button>
          </label>
        </form>
      </div>

      {data.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
}
