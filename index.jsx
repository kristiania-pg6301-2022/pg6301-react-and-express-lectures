import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";


function FrontPage() {
    return <div>
        <h1>Quiz app</h1>
        <Link to={"/question"}><button>Take a new quiz</button></Link>
    </div>;
}

function ShowQuestion() {
    return <div>
        <h1>Here is a question</h1>
    </div>;
}

function QuizGame() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/question"} element={<ShowQuestion />} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<QuizGame/>, document.getElementById("app"));
