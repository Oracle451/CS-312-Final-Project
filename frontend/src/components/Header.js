import React from "react";
import "./Header.css";

function Header({ title }) {
  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      <div className="header-user">
        <span>Welcome, User</span>
      </div>
    </header>
  );
}

export default Header;
