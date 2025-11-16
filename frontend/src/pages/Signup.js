import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Signup()
{
	const navigate = useNavigate();

	// Store form data and error messages
	const [form, setForm] = useState({
		username: "",
		full_name: "",
		password: ""
	});
	const [error, setError] = useState("");

	// Handle input changes
	const handleInputChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			// Send POST request to your Express backend
			const response = await fetch("/api/users/signup", { 
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await response.json();

			if (response.ok)
			{
				alert("Account created successfully!");
				navigate("/login");
			}
			else
			{
				setError(data.error || "Signup failed");
			}
		} catch (err) {
			console.error(err);
			setError("Signup failed due to network error.");
		}
	};

	const handleLoginClick = (e) => {
		e.preventDefault();
		navigate("/login");
	};

	return (
		<div className="login-container">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<input
					name="username"
					type="text"
					placeholder="Username"
					required
					value={form.username}
					onChange={handleInputChange}
				/>
				<input
					name="full_name"
					type="text"
					placeholder="Full Name"
					required
					value={form.full_name}
					onChange={handleInputChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={form.password}
					onChange={handleInputChange}
				/>
				<button type="submit">Create Account</button>
				<button
					type="button"
					onClick={handleLoginClick}
					style={{
						background: "none",
						color: "#38bdf8",
						border: "none",
						cursor: "pointer",
						marginTop: "12px",
					}}
				>
					Already have an account? Login
				</button>
			</form>

			{error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
		</div>
	);
}

export default Signup;
