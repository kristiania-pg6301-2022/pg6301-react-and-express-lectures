import React from "react";

export interface Movie {
  title: string;
  year: string;
  plot: string;
}

export interface MovieApi {
  listMovies(): Promise<Movie[]>;

  addMovie(movie: Movie): Promise<void>;
}

export const ApiContext = React.createContext<MovieApi>({
  async listMovies() {
    return [];
  },
  async addMovie() {
    // Do nothing
  },
});
