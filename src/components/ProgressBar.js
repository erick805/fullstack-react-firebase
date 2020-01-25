import React from "react";

export default function ProgressBar({ max, current }) {
  const width = (current / max) * 100;
  return (
    <div id="progress-bar">
      <div id="progress-bar-full" style={{ width: `${width}%` }}></div>
    </div>
  );
}
