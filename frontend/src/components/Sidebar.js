import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar" style={{display: "flex", flexDirection: "column", height: "100vh"}}>
      {/* Search Bar */}
      <div style={{paddingBottom: "20px"}}>
        <input
          type="text"
          placeholder="Search..."
          className="sidebar-search-bar"
          style={{
            width: "80%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #64748b",
            fontSize: "1em"
          }}
        />
      </div>
      <ul className="sidebar-links" style={{flex: 1}}>
        <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Dashboard</Link></li>
        <li><Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>All Tasks</Link></li>
        <li><Link to="/overdue" className={location.pathname === "/overdue" ? "active" : ""}>Overdue</Link></li>
        <li><Link to="/create-task">New Task</Link></li>
        <li>My Tasks</li>
      </ul>
      {/* Move Login to Bottom and stylize */}
      <div style={{paddingTop: "10px"}}>
        <Link to="/login" style={{width: "100%", display: "block", textDecoration: "none"}}>
          <button
            className="sidebar-login-btn"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#38bdf8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "1em",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;