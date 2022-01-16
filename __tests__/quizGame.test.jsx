import React from "react";
import ReactDOM from "react-dom";
import {FrontPage, QuestionContext, QuizGame} from "../quizGame";
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
        const question = {
            question: "Are you happy?",
            answers: {
                answer_a: "Yes",
                answer_b: "No",
                answer_c: "Maybe",
            }
        }
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter initialEntries={["/question"]}>
                <QuestionContext.Provider value={{randomQuestion: () => question}}>
                    <QuizGame />
                </QuestionContext.Provider>
            </MemoryRouter>,
            element
        );
        expect(pretty(element.innerHTML)).toMatchSnapshot();
    })
})
