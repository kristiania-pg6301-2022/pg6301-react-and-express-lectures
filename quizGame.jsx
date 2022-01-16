import React, {useContext, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {isCorrectAnswer, randomQuestion} from "./questions";

export const QuestionContext = React.createContext({randomQuestion})


export function FrontPage({correctAnswers, questionsAnswered}) {
    return <div>
        <h1>Kristiania Quiz</h1>
        <div data-testid={"status"}>You have answered {correctAnswers} of {questionsAnswered} correctly</div>
        <Link to={"/question"}>
            <button>Take a new quiz</button>
        </Link>
    </div>;
}

export function ShowQuestion({setCorrectAnswers, setQuestionsAnswered}) {
    function handleAnswer(answer) {
        setQuestionsAnswered(q => q + 1);
        if (isCorrectAnswer(question, answer)) {
            setCorrectAnswers(q => q + 1);
            navigate("/answer/correct");
        } else {
            navigate("/answer/wrong");
        }
    }

    const navigate = useNavigate();
    const {randomQuestion} = useContext(QuestionContext);
    const [question] = useState(randomQuestion());
    return <div>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <div key={a} data-testid={a}>
                <button onClick={() => handleAnswer(a)}>{question.answers[a]}</button>
            </div>)}
    < /div>;
}

function ShowAnswer() {
    return <div>
        <Routes>
            <Route path={"correct"} element={<h1>Correct!</h1>}/>
            <Route path={"wrong"} element={<h1>Wrong!</h1>}/>
        </Routes>
        <div><Link to={"/"}>Show score</Link></div>
        <div><Link to={"/question"}>New question</Link></div>
    </div>
}

export function QuizGame() {
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    return (
        <Routes>
            <Route path={"/"}
                   element={<FrontPage questionsAnswered={questionsAnswered} correctAnswers={correctAnswers}/>}/>
            <Route path={"/question"} element={<ShowQuestion setQuestionsAnswered={setQuestionsAnswered}
                                                             setCorrectAnswers={setCorrectAnswers}/>}/>
            <Route path={"/answer/*"} element={<ShowAnswer/>}/>
        </Routes>
    );
}
