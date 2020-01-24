import React from "react";
import Home from "./components/Home";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Game from "./components/Game";
import HighScores from "./components/HighScores";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
      <Route path="/highScores" component={HighScores} />
    </Router>
  );
}

export default App;
