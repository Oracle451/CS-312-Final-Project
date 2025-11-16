import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DashboardCard.css";

function DashboardCard({ title, type, value, path }) {
  const location = useLocation();
  if (type === "text")
  {
    return (
      <Link
        to={path}
        className={`dashboard-card ${location.pathname === path ? "active" : ""}`}
      >
        <h3>{title}</h3>
        {value && <p>{value}</p>}
      </Link>
    );
  }
else if (type === "display")
  {
  var complete = value.completed === 0 ? 0 : Math.floor(value.completed / value.total * 100);
  var overdue = value.overdue === 0 ? 0 : Math.floor(value.overdue / value.total * 100);
  var progress = 100 - complete - overdue;

  return (
    <Link
      to={path}
      className={`dashboard-card ${location.pathname === path ? "active" : ""}`}
    >
      <h3>{title}</h3>
      <div className="stat-card">
        <div className="stat-bar stat-bar-complete" style={{width: `${complete}%`}}/>
        <div className="stat-bar stat-bar-in-progress" style={{width:`${progress}%`}}/>
        <div className="stat-bar stat-bar-overdue" style={{width:`${overdue}%`}}/>
      </div>
    </Link>
  );
}
}

export default DashboardCard;
