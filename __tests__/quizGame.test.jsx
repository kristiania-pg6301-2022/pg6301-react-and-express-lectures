import React from "react";
import ReactDOM from "react-dom";
import {FrontPage, QuestionContext, QuizGame, ShowQuestion} from "../quizGame";
import {MemoryRouter} from "react-router-dom";
import pretty from "pretty";
import {Simulate} from "react-dom/test-utils";

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
                    <QuizGame/>
                </QuestionContext.Provider>
            </MemoryRouter>,
            element
        );
        expect(pretty(element.innerHTML)).toMatchSnapshot();
    });


    it("records correct answer", () => {
        const question = {
            question: "Are you happy?",
            answers: {
                answer_a: "Yes",
                answer_b: "No",
                answer_c: "Maybe",
            },
        }
        const setQuestionsAnswered = jest.fn()
        const setCorrectAnswers = jest.fn()

        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter initialEntries={["/question"]}>
                <QuestionContext.Provider value={{randomQuestion: () => question}}>
                    <ShowQuestion setCorrectAnswers={setCorrectAnswers} setQuestionsAnswered={setQuestionsAnswered}/>
                </QuestionContext.Provider>
            </MemoryRouter>,
            element
        );

        Simulate.click(element.querySelector("[data-testid=answer_a]"));
        expect(setQuestionsAnswered).toBeCalled();
        expect(setCorrectAnswers).toBeCalled();
    });
})
