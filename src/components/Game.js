import React from "react";
import Question from "./Question";

export default function Game() {
  const dummyQuestions = {
    question: "What's the best programming language?!",
    answerChoices: ["JavaScript", "Java", "C#", "Swift"]
  };
  return (
    <>
      <Question question={dummyQuestions} />
    </>
  );
}
