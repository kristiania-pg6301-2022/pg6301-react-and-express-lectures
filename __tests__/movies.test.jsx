import * as React from "react";
import {render} from "react-dom";
import {ListMovies} from "../movieApplication";

describe("movie pages", () => {

    it("shows movies list", () => {
        const element = document.createElement("div");
        render(<ListMovies />, element);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("lets the user add a new movie", () => {

    });

});
