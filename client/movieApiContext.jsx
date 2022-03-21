import React from "react";
import { fetchJSON } from "./fetchJSON";

export const MovieApiContext = React.createContext({
  async listMovies(country) {
    return fetchJSON(`/api/movies?country=${country}`);
  },
  async createMovie(movie) {
    fetch("/api/movies", {
      method: "post",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
