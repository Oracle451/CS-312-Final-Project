import db from './db.js';

// WARNING: Passwords should be hashed before saving in production!
async function createUser({ username, full_name, password }) {
	const result = await db.query(
		`INSERT INTO users (username, full_name, password) VALUES ($1, $2, $3) RETURNING *`,
		[username, full_name, password]
	);
	return result.rows[0];
}

async function signInUser({ username, password }) {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length > 0) {
      if (result.rows[0].password == password) {
        return result.rows[0];
      }
    }

  } catch (err) {
    throw err;
  }

}

async function getUserByUsername(username) {
	const result = await db.query(
		`SELECT * FROM users WHERE username = $1`,
		[username]
	);
	return result.rows[0];
}

async function getUserById(id) {
	const result = await db.query(
		`SELECT * FROM users WHERE id = $1`,
		[id]
	);
	return result.rows[0];
}

async function updateUser(id, { full_name, password }) {
	const result = await db.query(
		`UPDATE users SET full_name = $1, password = $2 WHERE id = $3 RETURNING *`,
		[full_name, password, id]
	);
	return result.rows[0];
}

async function deleteUser(id) {
	await db.query(`DELETE FROM users WHERE id = $1`, [id]);
	return true;
}

export {
	createUser,
	getUserByUsername,
	getUserById,
	updateUser,
	deleteUser,
};