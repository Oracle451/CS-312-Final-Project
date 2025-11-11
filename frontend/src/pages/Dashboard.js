import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header title="Dashboard Overview" />
        <div className="dashboard-cards">
          <DashboardCard title="Total Tasks" value="128" />
          <DashboardCard title="Completed" value="76" />
          <DashboardCard title="Overdue" value="14" />
          <DashboardCard title="Upcoming" value="38" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
