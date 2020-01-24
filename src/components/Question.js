import React from "react";

export default function Question({ question }) {
  return (
    <>
      <h2>{question.question}</h2>
      {question.answerChoices.map((choice, idx) => (
        <div className="choice-container">
          <p className="choice-prefix">{idx + 1}</p>
          <p className="choice-text">{choice}</p>
        </div>
      ))}
    </>
  );
}
