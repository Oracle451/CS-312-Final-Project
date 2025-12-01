import React, { useState, useEffect } from "react";
import "./Header.css";

function Header({ title }) {
	const [user, setUser] = useState("User");

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
			if (data.username === "" || data.username === undefined) {
				setUser("User")
			}
			else {
				setUser(data.username)
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
