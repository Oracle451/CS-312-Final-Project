import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: "16px" }}>
        <button type="button" onClick={handleSignupClick} style={{ background: "none", color: "#38bdf8", border: "none", cursor: "pointer" }}>
          Don't have an account? Signup
        </button>
      </div>
    </div>
  );
}

export default Login;