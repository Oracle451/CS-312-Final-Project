import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Task Manager</h2>
      <ul className="sidebar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/tasks">All Tasks</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
