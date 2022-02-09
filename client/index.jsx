import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>The Quiz Broadcast</h1>
      <ul>
        <li>
          <Link to="/answer">Answer a question</Link>
        </li>
        <li>
          <Link to="/score">Show score</Link>
        </li>
      </ul>
    </div>
  );
}

function AnswerQuestion() {
  return <h1>Show question</h1>;
}

function ShowScore() {
  return <h1>Show score</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/answer"} element={<AnswerQuestion />} />
        <Route path={"/score"} element={<ShowScore />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
