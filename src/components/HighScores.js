import React, { useState, useEffect } from "react";
import { useFirebase } from "./Firebase/FirebaseContext";

export default function HighScores() {
  const [scores, setScores] = useState([]);

  const firebase = useFirebase();

  useEffect(() => {
    firebase.scores().once("value", snapshot => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
    });
  });

  const formatScoreData = firebaseScores => {
    const scores = [];

    for (const key in firebaseScores) {
      const val = firebaseScores[key];
      val["key"] = key;
      scores.push(val);
    }
    return scores.sort((a, b) => b.score - a.score).slice(0, 10);
  };

  return (
    <>
      <h1>High Scores</h1>
      <div id="high-scores-list">
        {scores.map(record => (
          <li key={record.key} className="high-score">
            {record.name} - {record.score}
          </li>
        ))}
      </div>
    </>
  );
}
