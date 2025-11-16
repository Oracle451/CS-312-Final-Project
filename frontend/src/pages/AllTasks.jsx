import { useState } from "react";
import TaskList from "./TaskList";
import "./styles.css";

export default function AllTasks() {
  const [ordering, setOrdering] = useState("");

  const handleSort = (field) => {
    setOrdering(field); // updates the sort field
  };

  return (
    <div className="all-tasks-page">
      <div className="sort-bar">
        <span className="sort-label">Sort By:</span>

        <button className="sort-btn" onClick={() => handleSort("title")}>Title</button>
        <button className="sort-btn" onClick={() => handleSort("assigned_user_id")}>Assigned User</button>
        <button className="sort-btn" onClick={() => handleSort("created_by")}>Creator</button>
        <button className="sort-btn" onClick={() => handleSort("due_date")}>Due Date</button>
        <button className="sort-btn" onClick={() => handleSort("created_at")}>Creation Date</button>
        <button className="sort-btn" onClick={() => handleSort("updated_at")}>Last Updated</button>
      </div>

      <TaskList
        title="All Tasks"
        fetchUrl={`/api/tasks/AllTasks/:${ordering}`}
      />
    </div>
  );
}
