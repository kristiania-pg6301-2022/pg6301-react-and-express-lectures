import React from "react";

export function AddNewMovie({ movieApi }) {
  function handleSubmit() {
    movieApi.createMovie({ title, year, country, plot });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new movie</h1>
    </form>
  );
}
