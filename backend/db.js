// Import pg for database access
import pg from "pg";

// Use dotenv to allow environment variable configuration (optional but recommended)
import dotenv from "dotenv";
dotenv.config();

// Create a new pg client for your database
export const db = new pg.Client({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "TaskTrackerDB",
  password: process.env.PGPASSWORD || "password",
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

// Connect to the database using your db variable
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB connection error:", err));

export default db; 