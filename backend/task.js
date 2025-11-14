import db from './db.js';

// Function to create a new task
async function createTask(data)
{
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

// Function to get a task by its id
async function getTaskById(id)
{
	// Query the database for a task with the given id
	const result = await db.query(
		`SELECT * FROM tasks WHERE id = $1`,
		[id]
	);

	// Return the first result returned by the query
	return result.rows[0];
}

async function updateTask(id, data) {
	const fields = [];
	const values = [];
	let idx = 1;

	for (const key of ['title', 'description', 'due_date', 'priority', 'status', 'assigned_user_id', 'created_by'])
	{
		if (data[key] !== undefined)
			{
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

async function deleteTask(id)
{
	const result = await db.query(
		`DELETE FROM tasks WHERE id = $1 RETURNING *`,
		[id]
	);
	return result.rows[0];
}

async function searchTasksByTitle(queryText)
{
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

async function GetAllTasks() {
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
    ORDER BY created_at DESC;
  `);

  return result.rows;
}


export {
	createTask,
	getTaskById,
	GetAllTasks,
	updateTask,
	deleteTask,
	searchTasksByTitle,
};