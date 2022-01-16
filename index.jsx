import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {randomQuestion} from "./questions";


function FrontPage() {
    return <div>
        <h1>Quiz app</h1>
        <Link to={"/question"}>
            <button>Take a new quiz</button>
        </Link>
    </div>;
}

function ShowQuestion() {
    const [question] = useState(randomQuestion());
    return <div>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <div key={a}>
            <button>{question.answers[a]}</button>
        </div>)}
    < /div>;
}

function QuizGame() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/question"} element={<ShowQuestion/>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<QuizGame/>, document.getElementById("app"));
