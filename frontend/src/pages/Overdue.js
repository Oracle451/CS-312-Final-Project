import React from "react";
import TaskItem from "../components/TaskItem";
import "./Overdue.css";

function Overdue() {

  let placeHolder = 14

  return (
    <div className="main">
      <h2>Overdue Tasks: {placeHolder}</h2>
      <p>All Overdue Tasks:</p>
      <TaskItem />
    </div>
  );
}

export default Overdue;