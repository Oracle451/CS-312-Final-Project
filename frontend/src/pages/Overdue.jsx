import React from "react";
import TaskItem from "../components/TaskItem";
import TaskList from "./TaskList";

export default function GetOverdueTasks()
{
	return (
		<div className="main">      
			<TaskList
				title="Overdue Tasks"
				fetchUrl="/api/tasks/overdue"
			/>
		</div>
	);
}