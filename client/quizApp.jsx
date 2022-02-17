import React, { useState } from "react";
import { fetchJSON, postJSON } from "./http";
import { useLoader } from "./useLoader";

function ShowQuestion({ question, onReload }) {
  async function handleAnswer(answer) {
    const { id } = question;
    postJSON("/quiz/answer", { id, answer });
    onReload();
  }
  return (
    <div>
      <h2>{question.question}</h2>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((a) => (
          <div key={a}>
            <button onClick={() => handleAnswer(a)}>
              {question.answers[a]}
            </button>
          </div>
        ))}
    </div>
  );
}

function QuestionComponent({ reload }) {
  const [question, setQuestion] = useState();

  async function handleLoadQuestion() {
    const res = await fetch("/quiz/random");
    setQuestion(await res.json());
  }

  function handleReload() {
    setQuestion(undefined);
    reload();
  }

  if (!question) {
    return (
      <div>
        <button onClick={handleLoadQuestion}>Load a new question</button>
      </div>
    );
  }

  return <ShowQuestion question={question} onReload={handleReload} />;
}

export function QuizApp() {
  const {
    data: score,
    loading,
    reload,
  } = useLoader(async () => fetchJSON("/quiz/score"));

  return (
    <>
      <h1>Welcome to the quiz show</h1>
      {loading && <div>Loading...</div>}
      {score && (
        <div>
          You have answered {score.correct} out of {score.answered} correct
        </div>
      )}
      <QuestionComponent reload={reload} />
    </>
  );
}
