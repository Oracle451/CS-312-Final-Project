import React from "react";
import TaskItem from "../components/TaskItem"

function Tasks() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div style={{ padding: "20px" }}>
          <h2>Tasks: 138</h2>
          <p>All Tasks:</p>
          <TaskItem />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
