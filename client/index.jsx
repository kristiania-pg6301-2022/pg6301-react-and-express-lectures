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

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
}

function FormInput({ label, value, setValue }) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}

function FormTextarea({ label, value, setValue }) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}

function MovieView({
  movie: { countries, directors, fullplot, poster, title, year },
}) {
  return (
    <div>
      <h3>
        {title} ({year})
      </h3>
      {directors && (
        <div>
          <strong>Directed by {directors.join(", ")}</strong>
        </div>
      )}
      <img src={poster} alt="Movie poster" width={100} />
      <div>
        {fullplot} (countries: {countries.join(", ")})
      </div>
    </div>
  );
}

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [fullplot, setFullplot] = useState("");
  const [country, setCountry] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await postJSON("/api/movies", {
      title,
      year: parseInt(year),
      directors: [director],
      fullplot,
      countries: [country],
    });
    setTitle("");
    setYear("");
    setDirector("");
    setFullplot("");
    setCountry("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new movie</h2>
      <FormInput label={"Title"} value={title} setValue={setTitle} />
      <FormInput label={"Year"} value={year} setValue={setYear} />
      <FormInput label={"Director"} value={director} setValue={setDirector} />
      <FormInput label={"Country"} value={country} setValue={setCountry} />
      <FormTextarea
        label={"Full plot"}
        value={fullplot}
        setValue={setFullplot}
      />
      <div>
        <button disabled={title.length === 0 || year.length === 0}>Save</button>
      </div>
    </form>
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

      <AddMovie />

      {data.map((movie) => (
        <MovieView key={movie.title} movie={movie} />
      ))}
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
