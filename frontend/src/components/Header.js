import React from "react";
import "./Header.css";

function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-user">
        <img src="https://via.placeholder.com/32" alt="User" />
        <span>Welcome, User</span>
      </div>
    </header>
  );
}

export default Header;
