import React, { useEffect, useState } from "react";
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
  function handleConfirm(answer) {
    fetch(`/questions/${question.id}/answer`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
  }

  const [question, setQuestion] = useState();
  useEffect(async () => {
    const res = await fetch("/question/random");
    setQuestion(await res.json());
  }, []);

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((answer) => (
          <div key={answer}>
            <button onClick={(q) => handleConfirm("sndldn")}>
              {question.answers[answer]}
            </button>
          </div>
        ))}
    </div>
  );
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
