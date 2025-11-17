import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account()
{
	const navigate = useNavigate();

  	const [username, setUsername] = useState(""); // store username in state
  	const [user, setUser] = useState(null);
  	const [form, setForm] = useState({
		id: "",
		username: "",
		full_name: "",
		password: ""
  	});
  	const [loading, setLoading] = useState(true);
  	const [message, setMessage] = useState("");

  	// Fetch current username on mount
  	useEffect(() => {
		const fetchUsername = async () => {
			try {
				const response = await fetch("/api/users/getCurrentUser");
				const data = await response.json();
				setUsername(data.username || "User");
			} catch (err) {
				console.error(err);
				setUsername("User");
			}
		};
		fetchUsername();
  	}, []);

  	// Fetch account details once username is available
  	useEffect(() => {
		if (username == "User" || username == null || username == "") return;

		fetch(`/api/users/username/${username}`)
	  		.then((res) => res.json())
	  		.then((data) => {
			setUser(data);
			setForm({
		  		id: data.id,
		  		username: data.username,
		  		full_name: data.full_name,
		  		password: ""
			});
	  	})
	  	.catch(() => setMessage("Error loading account info"))
	  	.finally(() => setLoading(false));
 	}, [username]);

  	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  	const handleSave = async () => {
		setMessage("");
		const response = await fetch(`/api/users/update/${username}`, {
	  		method: "PUT",
	  		headers: { "Content-Type": "application/json" },
	  		body: JSON.stringify(form)
		});
		const data = await response.json();
		if (response.ok)
		{
	  		setMessage("Account updated successfully!");
	  		if (form.username !== username)
				{
				setUsername(form.username);
	  		}
		}
		else
		{
	  		setMessage(data.error || "Update failed");
		}
  	};

  	const handleSignOut = async () => {
		if (!window.confirm("Are you SURE you want to sign out of your account?")) return;

		const res = await fetch(`/api/users/signout`, { method: "POST" });

		if (res.ok)
		{
	  		localStorage.clear();
	  		navigate("/login");
	  		window.location.reload();
		}
		else
		{
	  		setMessage("Failed to sign out of account");
		}
  	};

  	const handleDelete = async () => {
		if (!window.confirm("Are you SURE you want to delete your account?")) return;

		const res = await fetch(`/api/users/delete/${username}`, { method: "DELETE" });

		if (res.ok)
		{
	  		localStorage.clear();
	  		navigate("/login");
	  		window.location.reload();
		}
		else
		{
	  		setMessage("Failed to delete account");
		}
  	};

  	if (loading) return <p>Loading account...</p>;
  	if (!user) return <p>No account found.</p>;

  	return (
		<div className="main" style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
			<h2>My Account</h2>

			<div className="account-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<label>User ID
				<input type="text" name="id" value={form.id} readOnly style={{ width: "100%", padding: 6, background: "#e5e7eb" }} />
				</label>

				<label>Username
				<input type="text" name="username" value={form.username} onChange={handleChange} style={{ width: "100%", padding: 6 }} />
				</label>

				<label>Full Name
				<input type="text" name="full_name" value={form.full_name} onChange={handleChange} style={{ width: "100%", padding: 6 }} />
				</label>

				<label>New Password (optional)
				<input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: "100%", padding: 6 }} />
				</label>

				<button onClick={handleSave} style={{ background: "#38bdf8", color: "white", padding: "10px", border: "none", borderRadius: "5px" }}>Save Changes</button>
				<button onClick={handleSignOut} style={{ background: "#38bdf8", color: "white", padding: 10, border: "none", borderRadius: 5, marginTop: 10 }}>Sign Out</button>
				<button onClick={handleDelete} style={{ background: "red", color: "white", padding: "10px", border: "none", borderRadius: "5px", marginTop: 10 }}>Delete Account</button>
			</div>

			{message && <p style={{ marginTop: 16, color: "green" }}>{message}</p>}
		</div>
  	);
}
