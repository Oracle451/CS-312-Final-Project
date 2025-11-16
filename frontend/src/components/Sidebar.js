import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [acctBtnVis, setAcctBtnVis] = useState(false);
  const [sInBtnVis, setSInBtnVis] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  useEffect(() => {
      changeAccountButtons();
    }, []);

  async function changeAccountButtons() {
    try {
      const response = await fetch("/api/users/getCurrentUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("I grabbed: ", data);
      if (data.username === "" || data.username === undefined) {
        setAcctBtnVis(false);
        setSInBtnVis(true);
      } else {
        setAcctBtnVis(true);
        setSInBtnVis(false);
      }

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column"}}>
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
          <Link to="/AllTasks" className={location.pathname === "/AllTasks" ? "active" : ""}>
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
        <li><Link to="/myTasks">My Tasks</Link></li>
      </ul>
      {/* Move Login to Bottom and stylize */}
      <div className="sidebar-account-btns">
        <Link to="/login">
          <button className="sidebar-login-btn" style={{ display: sInBtnVis ? "block" : "none" }}>
            Login
          </button>
        </Link>
        <Link to="/account">
          <button className="account-btn" style={{ display: acctBtnVis ? "block" : "none" }}>
            Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;