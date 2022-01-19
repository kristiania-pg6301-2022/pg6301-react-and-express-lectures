import * as React from "react";
import {render} from "react-dom";
import {ListMovies, NewMovie} from "../application";
import {Simulate} from "react-dom/test-utils";

describe("Movies", () => {
    it("runs shows movies", () => {
        const movies = [
            {
                title: "don't look up", year: 2021, plot: "Global disaster"
            },
            {
                title: "alien", year: 1979, plot: "Horror in space"
            }
        ]
        const element = document.createElement("div");
        render(<ListMovies movies={movies} />, element);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("creates new movie", () => {
        const element = document.createElement("div");
        const onAddMovie = jest.fn();
        render(<NewMovie onAddMovie={onAddMovie} />, element);
        expect(element.innerHTML).toMatchSnapshot();
        Simulate.change(element.querySelector("input"), {target: {value: "Some movie"}});
        expect(onAddMovie).toBeCalledWith({
            title: "Some movie", year: "", plot: ""
        })
    })
})
