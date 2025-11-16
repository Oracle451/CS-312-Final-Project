import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DashboardCard.css";

function DashboardCard({ title, value, path }) {
  const location = useLocation();

  return (
    <Link
      to={path}
      className={`dashboard-card ${location.pathname === path ? "active" : ""}`}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </Link>
  );
}

export default DashboardCard;
