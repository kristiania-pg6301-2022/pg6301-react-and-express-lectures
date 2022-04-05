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
  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
