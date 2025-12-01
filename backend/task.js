import db from './db.js';

//------------------------------------------
// Create, Update, Delete Functions
//------------------------------------------

// Function to create a new task
async function createTask(data) {
	// Create a constant to hold the task information
	const
		{
			title,
			description,
			due_date,
			priority,
			status,
			assigned_user_id,
			created_by
		} = data;

	// Query the database to add a task to the database
	const result = await db.query(
		`INSERT INTO tasks (title, description, due_date, priority, status, assigned_user_id, created_by)
		 VALUES ($1, $2, $3, $4, $5, $6, $7)
		 RETURNING *`,
		[title, description, due_date, priority, status, assigned_user_id, created_by]
	);

	// Return the result
	return result.rows[0];
}

// Function to update a task with new information
async function updateTask(id, data) {
	const fields = [];
	const values = [];
	let idx = 1;

	for (const key of ['title', 'description', 'due_date', 'priority', 'status', 'assigned_user_id', 'created_by']) {
		if (data[key] !== undefined) {
			fields.push(`${key} = $${idx}`);
			values.push(data[key]);
			idx++;
		}
	}

	if (fields.length === 0) return getTaskById(id);

	values.push(id);

	const result = await db.query(
		`UPDATE tasks SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
		values
	);

	return result.rows[0];
}

// Function to delete a task
async function deleteTask(id) {
	const result = await db.query(
		`DELETE FROM tasks WHERE id = $1 RETURNING *`,
		[id]
	);
	return result.rows[0];
}


//------------------------------------------
// Retreival Functions
//------------------------------------------

// Function to get a task by its id
async function getTaskById(id) {
	// Query the database for a task with the given id
	const result = await db.query(
		`SELECT * FROM tasks WHERE id = $1`,
		[id]
	);

	// Return the first result returned by the query
	return result.rows[0];
}

// Function to search tasks by title
async function searchTasksByTitle(queryText) {
	if (!queryText || queryText.trim() === "") return [];

	try {
		const result = await db.query(
			`SELECT * 
			 FROM tasks 
			 WHERE title ILIKE $1 
			 ORDER BY created_at DESC`,
			[`%${queryText}%`]
		);
		return result.rows;
	} catch (err) {
		console.error("Error searching tasks:", err);
		throw err;
	}
}

// Function to get all tasks 
async function GetAllTasks(ordering = "created_at") {
	// Allowed columns to prevent SQL injection
	const allowedColumns = [
		"title",
		"assigned_user_id",
		"created_by",
		"due_date",
		"created_at",
		"updated_at"
	];

	// Fallback to "created_at" if invalid
	if (!allowedColumns.includes(ordering)) {
		ordering = "created_at";
	}

	const result = await db.query(`
		SELECT *
		FROM tasks
		ORDER BY ${ordering} ASC;
  	`);

	return result.rows;
}

// Function to get overdue tasks
async function getOverdueTasks() {
	const result = await db.query(`
		SELECT
		id,
		title,
		description,
		due_date,
		priority,
		status,
		assigned_user_id,
		created_by,
		created_at,
		updated_at
		FROM tasks
		WHERE status = 'Overdue'
		ORDER BY due_date ASC;
	`);

	return result.rows;
}

// Function to get completed tasks
async function getCompletedTasks() {
	const result = await db.query(`
		SELECT
		id,
		title,
		description,
		due_date,
		priority,
		status,
		assigned_user_id,
		created_by,
		created_at,
		updated_at
		FROM tasks
		WHERE status = 'Completed'
		ORDER BY due_date ASC;
	`);

	return result.rows;
}

// Function to get upcoming tasks
async function getUpcomingTasks() {
	const result = await db.query(`
		SELECT
		id,
		title,
		description,
		due_date,
		priority,
		status,
		assigned_user_id,
		created_by,
		created_at,
		updated_at
		FROM tasks
		WHERE due_date >= CURRENT_DATE
  		AND status NOT IN ('Completed', 'Overdue', 'Closed')
		ORDER BY due_date ASC;
	`);

	return result.rows;
}

// Get tasks assigned to a specific user
async function getTasksByUser(username) {
	const query = `
		SELECT * FROM tasks
		WHERE assigned_user_id = $1;
	`;

	const result = await db.query(query, [username]);
	return result.rows;
}

// Export all task api functions
export {
	createTask,
	getTaskById,
	GetAllTasks,
	updateTask,
	deleteTask,
	searchTasksByTitle,
	getOverdueTasks,
	getTasksByUser,
	getCompletedTasks,
	getUpcomingTasks
};