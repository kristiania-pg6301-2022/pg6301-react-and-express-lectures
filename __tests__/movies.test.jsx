import * as React from "react";
import {render} from "react-dom";
import {ListMovies} from "../application";

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
        let element = document.createElement("div");
        render(<ListMovies movies={movies} />, element);
        expect(element.innerHTML).toMatchSnapshot();
    });
})
