import React from "react";

export default function Question({ question }) {
  return (
    <>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      {question.answerChoices.map((choice, idx) => (
        <div key={idx} className="choice-container">
          <p className="choice-prefix">{idx + 1}</p>
          <p
            className="choice-text"
            dangerouslySetInnerHTML={{ __html: choice }}
          ></p>
        </div>
      ))}
    </>
  );
}
