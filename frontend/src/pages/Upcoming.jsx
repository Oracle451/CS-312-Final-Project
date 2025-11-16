import React from "react";
import TaskItem from "../components/TaskItem";
import TaskList from "./TaskList";

export default function GetUpcomingTasks()
{
	return (
		<div className="main">      
	  	<TaskList
			title="Upcoming Tasks"
			fetchUrl="/api/tasks/upcoming"
	  	/>
		</div>
  	);
}