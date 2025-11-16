import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send POST request to your Express backend
      const response = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.username);
        alert("Logged In!");
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }

    } catch (err) {
      console.error(err);
      setError("Incorrect Username or Password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required

        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: "16px" }}>
        <button type="button" onClick={handleSignupClick} style={{ background: "none", color: "#38bdf8", border: "none", cursor: "pointer" }}>
          Don't have an account? Signup
        </button>
      </div>

      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
    </div>
  );
}

export default Login;