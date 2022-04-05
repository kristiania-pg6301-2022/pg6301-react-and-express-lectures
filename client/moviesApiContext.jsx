import React from "react";
import { fetchJSON } from "./lib/fetchJSON";

export const MoviesApiContext = React.createContext({
  async listMovies() {
    return await fetchJSON("/api/movies");
  },
});
