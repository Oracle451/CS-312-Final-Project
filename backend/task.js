const db = require('./db');

async function createTask(data) {
  const {
    title, description, due_date, priority, status,
    assigned_user_id, created_by
  } = data;
  const result = await db.query(
    `INSERT INTO tasks (title, description, due_date, priority, status, assigned_user_id, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, description, due_date, priority, status, assigned_user_id, created_by]
  );
  return result.rows[0];
}

async function getTaskById(id) {
  const result = await db.query(
    `SELECT * FROM tasks WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function getAllTasks({ status, priority, due_date, sortBy, assigned_user_id } = {}) {
  let query = `SELECT * FROM tasks`;
  const conditions = [];
  const values = [];

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  if (priority) {
    values.push(priority);
    conditions.push(`priority = $${values.length}`);
  }
  if (due_date) {
    values.push(due_date);
    conditions.push(`due_date = $${values.length}`);
  }
  if (assigned_user_id) {
    values.push(assigned_user_id);
    conditions.push(`assigned_user_id = $${values.length}`);
  }
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  if (sortBy && ['due_date', 'priority', 'assigned_user_id'].includes(sortBy)) {
    query += ` ORDER BY ${sortBy}`;
  }

  const result = await db.query(query, values);
  return result.rows;
}

async function updateTask(id, data) {
  const keys = Object.keys(data);
  if (!keys.length) return null;
  const setString = keys.map((k, idx) => `${k} = $${idx + 1}`).join(', ');
  const result = await db.query(
    `UPDATE tasks SET ${setString}, updated_at = CURRENT_TIMESTAMP WHERE id = $${keys.length + 1} RETURNING *`,
    [...Object.values(data), id]
  );
  return result.rows[0];
}

async function deleteTask(id) {
  await db.query(`DELETE FROM tasks WHERE id = $1`, [id]);
  return true;
}

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};