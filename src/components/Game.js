import React, { useState, useEffect, useCallback } from "react";
import Question from "./Question";
import { loadQuestions } from "../utilities/questionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

export default function Game({ history }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    loadQuestions()
      .then(questions => setQuestions(questions))
      .catch(err => console.error(err));
  }, []);

  const scoreSaved = () => {
    history.push("/");
  };

  const changeQuestion = useCallback(
    (bonus = 0) => {
      if (questions.length === 0) {
        setDone(true);
        return setScore(score + bonus);
      }
      // get random index of question
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      // set current question to the question at random index
      const currentQuestion = questions[randomQuestionIndex];
      // remove question from questions going forward
      const remainingQuestions = [...questions];
      remainingQuestions.splice(randomQuestionIndex, 1);

      // update the state to reflect changes
      setQuestions(remainingQuestions);
      setCurrentQuestion(currentQuestion);
      setLoading(false);
      setScore(score + bonus);
      setQuestionNumber(questionNumber + 1);
    },
    [
      questions,
      questionNumber,
      setQuestions,
      setQuestionNumber,
      setCurrentQuestion,
      setLoading,
      score
    ]
  );

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [currentQuestion, questions, changeQuestion]);

  return (
    <>
      {loading && !done && <div id="loader" />}
      {!done && !loading && currentQuestion && (
        <>
          <HUD score={score} questionNumber={questionNumber} />
          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
          />
        </>
      )}

      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
}
