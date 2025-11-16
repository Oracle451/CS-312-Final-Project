import React from "react";
import TaskList from "./TaskList";

export default function GetMyTasks() {
  // Get user ID from login (stored in localStorage after signin)
  const user = localStorage.getItem("username");

  return (
    <div className="main">
      <TaskList
        title="My Tasks"
		// passes userId into backend query
        fetchUrl={`/api/tasks/myTasks/${user}`}
      />
    </div>
  );
}
