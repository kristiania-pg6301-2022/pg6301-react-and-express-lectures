import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {isCorrectAnswer, randomQuestion} from "./questions";


function FrontPage() {
    return <div>
        <h1>Quiz app</h1>
        <Link to={"/question"}>
            <button>Take a new quiz</button>
        </Link>
    </div>;
}

function ShowQuestion() {
    function handleAnswer(answer) {
        if (isCorrectAnswer(question, answer)) {
            navigate("/answer/correct");
        } else {
            navigate("/answer/wrong");
        }
    }
    const navigate = useNavigate();
    const [question] = useState(randomQuestion());
    return <div>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <div key={a}>
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

function QuizGame() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/question"} element={<ShowQuestion/>}/>
            <Route path={"/answer/*"} element={<ShowAnswer />}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<QuizGame/>, document.getElementById("app"));
