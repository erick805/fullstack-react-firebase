import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../utilities/questionsHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0,
      done: false
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
    const { questions } = this.state;

    if (questions.length === 0) {
      return this.setState({ done: true });
    }
    // get random index of question
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    // set current question to the question at random index
    const currentQuestion = questions[randomQuestionIndex];
    // remove question from questions going forward
    const remainingQuestions = [...questions];
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
    const {
      currentQuestion,
      loading,
      score,
      questionNumber,
      done
    } = this.state;
    return (
      <>
        {loading && !done && <div id="loader" />}
        {!done && !loading && currentQuestion && (
          <>
            <HUD score={score} questionNumber={questionNumber} />
            <Question
              question={currentQuestion}
              changeQuestion={this.changeQuestion}
            />
          </>
        )}

        {done && <SaveScoreForm score={score} />}
      </>
    );
  }
}
