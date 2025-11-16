import React, { useState, useEffect } from "react";
import "./Header.css";

function Header({ title }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users/getCurrentUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("I grabbed: ", data);
      if (data.username === "") {
        setUser("User")
      } else {
        setUser(data.username)
      }

      if (response.ok) {
        console.log("Grabbed Okay")
      }

    } catch (err) {
      console.error(err);
    }
};

  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      <div className="header-user">
        <span>Welcome, {user}</span>
      </div>
    </header>
  );
}

export default Header;
