import React from "react";
import { useNavigate } from "react-router-dom";
import "./TaskItem.css";

function TaskItem({ id, title, owner, date }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/${id}`); // go to edit task page
  };

  return (
    <div
      className="task"
      onClick={handleClick}
      style={{ cursor: "pointer" }} // shows pointer on hover
    >
      <p className="taskName">Task: {title}</p>
      <p className="owner">Assignee: {owner}</p>
      <p className="date">Due Date: {date}</p>
    </div>
  );
}

export default TaskItem;
