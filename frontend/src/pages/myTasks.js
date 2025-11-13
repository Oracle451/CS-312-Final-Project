import React from "react";
import TaskItem from "../components/TaskItem";
import "./Overdue.css";

function myTasks() {

	let placeHolder = 30

	return (
		<div className="main">
			<h2>My Tasks: {placeHolder}</h2>
			<p>All of My Tasks:</p>
			<TaskItem />
		</div>
	);
}

export default myTasks;