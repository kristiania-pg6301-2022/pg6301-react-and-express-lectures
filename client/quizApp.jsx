import React, { useEffect, useState } from "react";

function ShowQuestion({ question }) {
  async function handleAnswer(answer) {
    console.log("Answered " + answer);
    const { id } = question;
    const res = await fetch("/quiz/answer", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, answer }),
    });
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

function QuestionComponent() {
  const [question, setQuestion] = useState();

  async function handleLoadQuestion() {
    const res = await fetch("/quiz/random");
    setQuestion(await res.json());
  }

  if (!question) {
    return (
      <div>
        <button onClick={handleLoadQuestion}>Load a new question</button>
      </div>
    );
  }

  return <ShowQuestion question={question} />;
}

export function QuizApp() {
  const [score, setScore] = useState();
  useEffect(async () => {
    const res = await fetch("/quiz/score");
    setScore(await res.json());
  }, []);

  return (
    <>
      <h1>Welcome to the quiz show</h1>
      {score && (
        <div>
          You have answered {score.correct} out of {score.answered} correct
        </div>
      )}
      <QuestionComponent />
    </>
  );
}
