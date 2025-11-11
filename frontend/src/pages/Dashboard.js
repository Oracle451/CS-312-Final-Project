import React from "react";
import DashboardCard from "../components/DashboardCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-cards">
      <DashboardCard title="Total Tasks" value="128" />
      <DashboardCard title="Completed" value="76" />
      <DashboardCard title="Overdue" value="14" />
      <DashboardCard title="Upcoming" value="38" />
    </div>
  );
}

export default Dashboard;