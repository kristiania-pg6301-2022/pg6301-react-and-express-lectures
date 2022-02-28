import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        <li>
          <Link to={"/movies/list"}>List movies</Link>
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
    throw new Error(`Failed ${res.status}: ${(await res).statusText}`);
  }
  return await res.json();
}

function useLoader(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => load(), []);

  return { loading, error, data };
}

function ListMovies() {
  const { loading, error, data } = useLoader(async () => {
    return fetchJSON("/api/movies");
  });

  if (loading) {
    return <div>Loading.... </div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>List movies</h1>
      {data.map((movie) => (
        <div key={movie.title}>{movie.title}</div>
      ))}
    </div>
  );
}

function Movies() {
  return (
    <Routes>
      <Route path={"/list"} element={<ListMovies />} />
      <Route path={"/new"} element={<h1>Add new movie</h1>} />
    </Routes>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/movies/*"} element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
