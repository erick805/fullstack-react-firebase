import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../utilities/questionsHelper";
import HUD from "./HUD";
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0
    };
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();

      this.setState(
        {
          questions
        },
        () => {
          this.changeQuestion();
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  changeQuestion = (bonus = 0) => {
    // get random index of question
    const randomQuestionIndex = Math.floor(
      Math.random() * this.state.questions.length
    );
    // set current question to the question at random index
    const currentQuestion = this.state.questions[randomQuestionIndex];
    // remove question from questions going forward
    const remainingQuestions = [...this.state.questions];
    remainingQuestions.splice(randomQuestionIndex, 1);
    // update the state to reflect changes
    this.setState(prevState => ({
      questions: remainingQuestions,
      currentQuestion,
      loading: false,
      score: (prevState.score += bonus),
      questionNumber: prevState.questionNumber + 1
    }));
  };

  render() {
    const { currentQuestion, loading, score, questionNumber } = this.state;
    return (
      <>
        {loading && <div id="loader" />}
        {!loading && currentQuestion && (
          <>
            <HUD score={score} questionNumber={questionNumber} />
            <Question
              question={currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}
      </>
    );
  }
}
