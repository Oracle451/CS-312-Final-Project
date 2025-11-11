import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem"

function Tasks() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header title="All Tasks" />
        <div style={{ padding: "20px" }}>
          <p>All Tasks:</p>
          <TaskItem />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
