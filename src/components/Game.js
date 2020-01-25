import React, { Component } from "react";
import Question from "./Question";
import { loadQuestions } from "../utilities/questionsHelper";
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();

      this.setState({ questions, currentQuestion: questions[0] });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { currentQuestion, loading } = this.state;
    return (
      <>
        {loading && <div id="loader" />}
        {currentQuestion && <Question question={currentQuestion} />}
      </>
    );
  }
}
