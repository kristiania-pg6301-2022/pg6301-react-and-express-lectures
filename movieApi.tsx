import React from "react";

export interface Movie {
  title: string;
}

export interface MovieApi {
  listMovies(): Promise<Movie[]>;
}

export const ApiContext = React.createContext<MovieApi>({
  async listMovies() {
    return [];
  },
});
