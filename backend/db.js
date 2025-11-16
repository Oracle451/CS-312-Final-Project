// Import pg for database access
import pg from "pg";

// Create a new pg client for your database
export const db = new pg.Client({
	user: "postgres",
	host: "localhost",
	database: "TaskTrackerDB",
	password: "password",
	port: 5432,
});

// Connect to the database using your db variable
db.connect()
	.then(() => console.log("Connected to PostgreSQL"))
	.catch((err) => console.error("DB connection error:", err));

export default db; 