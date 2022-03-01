import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function useLoader(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(undefined);

  async function load() {
    try {
      setLoading(true);
      setError(undefined);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  return { loading, error, data };
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  return await res.json();
}

function MovieView({ movie }) {
  const { title } = movie;
  return (
    <div>
      <h3>
        {title} ({movie.year})
      </h3>
      <div>
        <strong>Directed by {movie.directors.join(", ")}</strong>
      </div>
      <img src={movie.poster} alt="Movie poster" width={100} />
      <div>
        {movie.fullplot} (countries: {movie.countries.join(", ")})
      </div>
    </div>
  );
}

function Application() {
  const { loading, error, data } = useLoader(
    async () => await fetchJSON("/api/movies")
  );

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <h1>Movies</h1>
      {data.map((movie) => (
        <MovieView key={movie.title} movie={movie} />
      ))}
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
