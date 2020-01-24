import React from "react";

export default function Question({ question }) {
  return (
    <div>
      <h2>{question.question}</h2>
      <div className="choice-container">
        <p className="choice-prefix">1</p>
        <p className="choice-text">{question.answerChoices[0]}</p>
      </div>
    </div>
  );
}
