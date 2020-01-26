import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./Firebase/FirebaseContext";

export default function SaveScoreForm({ score }) {
  const [userName, setUserName] = useState("");
  const firebase = useFirebase();

  const onUserNameChange = e => {
    const updatedUserName = e.target.value;
    setUserName(updatedUserName);
  };

  const saveHighScore = e => {
    e.preventDefault();
    const record = {
      name: userName,
      score
    };
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveHighScore}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="enter your score"
          value={userName}
          onChange={onUserNameChange}
        />
        <button type="submit" className="btn" disabled={!userName}>
          Save score
        </button>
      </form>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
}
