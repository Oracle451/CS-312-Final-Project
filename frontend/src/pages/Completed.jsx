import React from "react";
import TaskItem from "../components/TaskItem";
import TaskList from "./TaskList";

export default function GetCompletedTasks() {
  return (
    <div className="main">      
      <TaskList
        title="Completed Tasks"
        fetchUrl="/api/tasks/completed"
      />
    </div>
  );
}