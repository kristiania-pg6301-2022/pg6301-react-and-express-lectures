import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { fetchJSON } from "./http";
import { useLoader } from "./useLoader";

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

function AddMovie() {
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetchJSON("/api/movies", {
      method: "post",
      json: { title, year, plot },
    });
    setTitle("");
    setYear("");
    setPlot("");
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Movie</h1>
      <div>
        Title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        Year:
        <input value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>Plot:</div>
      <div>
        <textarea value={plot} onChange={(e) => setPlot(e.target.value)} />
      </div>
      <button>Submit</button>
    </form>
  );
}

function Movies() {
  return (
    <Routes>
      <Route path={"/list"} element={<ListMovies />} />
      <Route path={"/new"} element={<AddMovie />} />
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
