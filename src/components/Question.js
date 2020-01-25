import React, { useState } from "react";

export default function Question({ question, changeQuestion }) {
  const [classToApply, setClassToApply] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answering, setAnswering] = useState(false);

  const checkAnswer = selectedAnswer => {
    if (answering) return;
    setAnswering(true);
    setSelectedAnswer(selectedAnswer);

    const classToApply =
      selectedAnswer === question.answer ? "correct" : "incorrect";
    setClassToApply(classToApply);

    const bonus = selectedAnswer === question.answer ? 10 : 0;

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswering(false);
      changeQuestion();
    }, 1000);
  };

  return (
    <>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      {question.answerChoices.map((choice, idx) => (
        <div
          key={idx}
          className={`choice-container ${selectedAnswer === idx &&
            classToApply}`}
          onClick={() => checkAnswer(idx)}
        >
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
