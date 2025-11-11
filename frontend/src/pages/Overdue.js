import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import TaskItem from "../components/TaskItem"
import "./Overdue.css";

function Overdue() {

	let placeHolder = 14

	return (
		<div className="dashboard-container">
			<Sidebar />

			<div className="dashboard-main">
				<Header title={`Overdue Tasks: ${placeHolder}`} />

				<div className="main">

					<p>All Overdue Tasks:</p>
					<TaskItem />

				</div>

			</div>

		</div>
	);
}

export default Overdue;
