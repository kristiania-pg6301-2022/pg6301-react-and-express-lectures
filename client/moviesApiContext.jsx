import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";

export const MoviesApiContext = React.createContext({
  async listMovies(query) {
    return await fetchJSON("/api/movies?" + new URLSearchParams(query));
  },
  async createMovie(movie) {
    return await postJSON("/api/movies", movie);
  },
});
