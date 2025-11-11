import React from "react";
import "./TaskItem.css";

function TaskItem({ title }) {

	let owner = "Stephen Ceja"
	let taskName = "This is a Task Task name"
	let date = new Date().toLocaleString()

	return (
		<div className="task">
			<p className="taskName">Task: {taskName}</p>
			<p className="owner">Asignee: {owner}</p>
			<p className="date">Date: {date}</p>

		</div>
	);
}

export default TaskItem;
