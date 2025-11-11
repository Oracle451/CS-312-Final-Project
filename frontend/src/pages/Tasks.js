import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Tasks() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header title="All Tasks" />
        <div style={{ padding: "20px" }}>
          <p>This will show the task list.</p>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
