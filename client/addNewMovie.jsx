import React, { useState } from "react";

function FormInput({ value, label, onChangeValue }) {
  return (
    <div>
      <label>
        <strong>{label} </strong>
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
    </div>
  );
}

export function AddNewMovie({ movieApi }) {
  function handleSubmit() {
    movieApi.createMovie({ title, year, country, plot });
  }

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [plot, setPlot] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new movie</h1>
      <FormInput label="Title:" value={title} onChangeValue={setTitle} />
      <FormInput label="Year:" value={year} onChangeValue={setYear} />
      <FormInput label="Country:" value={country} onChangeValue={setCountry} />
      <FormInput label="Plot:" value={plot} onChangeValue={setPlot} />
      <pre>
        {JSON.stringify({ title, year, country, plot }, undefined, "  ")}
      </pre>
    </form>
  );
}
