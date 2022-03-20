import React, { useState } from "react";

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
    </form>
  );
}
