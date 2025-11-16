import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskItem.css";

function TaskItem({ id }) {
	const navigate = useNavigate();

	const [task, setTask] = useState(null);
	const [assignedUser, setAssignedUser] = useState(null);

  	useEffect(() => {
		async function fetchTask() {
			try {
				const res = await fetch(`/api/tasks/${id}`);
				const data = await res.json();
				setTask(data);

				if (data.assigned_user_id)
				{
					const userRes = await fetch(`/api/users/${data.assigned_user_id}`);
					const userData = await userRes.json();
					setAssignedUser(userData.username);
				}
			} catch (error) {
				console.error("Failed to load task:", error);
			}
		}

		fetchTask();
  	}, [id]);

  	const handleClick = () => {
		navigate(`/tasks/${id}`);
 	};

  	if (!task) return <div className="task loading">Loading...</div>;

  	return (
		<div
	  		className="task"
	  		onClick={handleClick}
	  		style={{ cursor: "pointer" }}
		>
			<p className="taskName">{task.title}</p>

			<p className="owner">
				Assigned User: {assignedUser ? assignedUser : "Unassigned"}
			</p>

			<p className="creator">Creator ID: {task.created_by}</p>

			<p className="description">
				{task.description || "No description provided."}
			</p>

			<p className="priority">Priority: {task.priority}</p>

			<p className="status">Status: {task.status}</p>

			<p className="date">
				Due Date: {task.due_date ? new Date(task.due_date).toISOString().split("T")[0] : "None"}
			</p>

			<p className="createdAt">
				Creation Date: {new Date(task.created_at).toLocaleString()}
			</p>

			<p className="updatedAt">
				Last Updated: {new Date(task.updated_at).toLocaleString()}
			</p>
		</div>
	);

}

export default TaskItem;
