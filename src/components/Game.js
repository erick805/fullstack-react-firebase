import React from "react";
import Question from "./Question";

export default function Game() {
  const dummyQuestions = {
    question: "What's the best programming language?!",
    answerChoices: ["JavaScript", "Java", "C#", "Swift"]
  };
  return (
    <>
      <h1>Game</h1>
      <Question question={dummyQuestions} />
    </>
  );
}
