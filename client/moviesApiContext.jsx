import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";

export const MoviesApiContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async listMovies(query) {
    return await fetchJSON("/api/movies?" + new URLSearchParams(query));
  },
  async createMovie(movie) {
    return await postJSON("/api/movies", movie);
  },
  async registerLogin(login) {
    return await postJSON("/api/login", login);
  },
});
