import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import "./Dashboard.css";

function Dashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    overdue: 0,
    upcoming: 0
  });

  useEffect(() => {
    async function fetchCounts() {
      const totalTasks = await fetch("/api/tasks/AllTasks/:due_date").then(r => r.json());
      const completedTasks = await fetch("/api/tasks/completed").then(r => r.json());
      const overdueTasks = await fetch("/api/tasks/overdue").then(r => r.json());
      const upcomingTasks = await fetch("/api/tasks/upcoming").then(r => r.json());

      setCounts({
        total: totalTasks.length,
        completed: completedTasks.length,
        overdue: overdueTasks.length,
        upcoming: upcomingTasks.length
      });
    }

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-cards">
      <DashboardCard title="Total Tasks" value={counts.total} path="/AllTasks" />
      <DashboardCard title="Completed" value={counts.completed} path="/Completed" />
      <DashboardCard title="Overdue" value={counts.overdue} path="/Overdue" />
      <DashboardCard title="Upcoming" value={counts.upcoming} path="/Upcoming" />
    </div>
  );
}

export default Dashboard;
