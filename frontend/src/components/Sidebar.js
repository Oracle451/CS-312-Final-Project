import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Search Bar */}
      <div style={{ paddingBottom: "20px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sidebar-search-bar"
            style={{
              width: "80%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #64748b",
              fontSize: "1em",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#38bdf8",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Search
          </button>
        </form>
      </div>
      <ul className="sidebar-links" style={{ flex: 1 }}>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>
            All Tasks
          </Link>
        </li>
        <li>
          <Link to="/overdue" className={location.pathname === "/overdue" ? "active" : ""}>
            Overdue
          </Link>
        </li>
        <li>
          <Link to="/create-task">New Task</Link>
        </li>
        <li>My Tasks</li>
      </ul>
      {/* Move Login to Bottom and stylize */}
      <div style={{ paddingTop: "10px" }}>
        <Link to="/login" style={{ width: "100%", display: "block", textDecoration: "none" }}>
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
              marginTop: "10px",
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