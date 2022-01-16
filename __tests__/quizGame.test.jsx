import React from "react";
import ReactDOM from "react-dom";
import {FrontPage} from "../quizGame";

describe("Quiz game", () => {
    it("Shows answer status", () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <FrontPage correctAnswers={3} questionsAnswered={10} />,
            element
        );
        expect(element.querySelector("[data-testid=status]").textContent)
            .toEqual("You have answered 3 of 10 correctly")
    })
})
