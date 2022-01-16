import React from "react";
import ReactDOM from "react-dom";
import {FrontPage, QuizGame} from "../quizGame";
import {MemoryRouter} from "react-router-dom";
import pretty from "pretty";

describe("Quiz game", () => {
    it("Shows answer status", () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter><FrontPage correctAnswers={3} questionsAnswered={10}/></MemoryRouter>,
            element
        );
        expect(element.querySelector("[data-testid=status]").textContent)
            .toEqual("You have answered 3 of 10 correctly");
        expect(pretty(element.innerHTML)).toMatchSnapshot();
    });

    it("shows question", () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter initialEntries={["/question"]}><QuizGame /></MemoryRouter>,
            element
        );
        expect(pretty(element.innerHTML)).toMatchSnapshot();
    })
})
