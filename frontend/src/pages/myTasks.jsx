import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import "./styles.css";

export default function AllTasks() {
	const [ordering, setOrdering] = useState("");
	const [user, setUser] = useState(0);
	let userId = ""

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch("/api/users/getCurrentUser", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			if (data.username === "" || data.username === undefined) {
				setUser(-1)
			}
			else {
				setUser(data.id)
			}

		} catch (err) {
			console.error(err);
		}

		const handleSort = (field) => {
			setOrdering(field); // updates the sort field
		};


	}

	return (
		<div className="all-tasks-page">
			{user == -1
				? <p>Not Signed In...</p>
				:
				<TaskList
					title="My Tasks"
					fetchUrl={`/api/tasks/myTasks/${user}`}
				/>
			}


		</div>
	);
}