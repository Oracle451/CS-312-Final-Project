import db from './db.js';

// Function to create a user
async function createUser({ username, full_name, password })
{
	const result = await db.query(
		`INSERT INTO users (username, full_name, password) VALUES ($1, $2, $3) RETURNING *`,
		[username, full_name, password]
	);
	return result.rows[0];
}

// Function to sign in a user
async function signInUser({ username, password })
{
	try
	{
		const result = await db.query("SELECT * FROM users WHERE username = $1", [
		username,
		]);

		if (result.rows.length > 0)
		{
			if (result.rows[0].password == password)
			{
				return result.rows[0];
			}
		}

	}
	catch (err)
	{
		throw err;
	}
}

// Function to get a user by their username
async function getUserByUsername(username)
{
	const result = await db.query(
		`SELECT * FROM users WHERE username = $1`,
		[username]
	);
	return result.rows[0];
}

// Function to get a user by their id
async function getUserById(id)
{
	const result = await db.query(
		`SELECT * FROM users WHERE id = $1`,
		[id]
	);
	return result.rows[0];
}

// Function to update a user
async function updateUser(oldUsername, newUsername, full_name, password) {
	let query, params;
	
	if (password)
	{
		// Update everything including password
		query = `
	  		UPDATE users
	  		SET username = $1,
		  	full_name = $2,
		  	password = $3,
	  		WHERE username = $4
	  		RETURNING id, username, full_name;
		`;
		params = [newUsername, full_name, password, oldUsername];
  	}
	else
	{
		// Update without password
		query = `
	  		UPDATE users
	  		SET username = $1,
		  	full_name = $2
	  		WHERE username = $3
	  		RETURNING id, username, full_name;
		`;
		params = [newUsername, full_name, oldUsername];
  	}

  	const result = await db.query(query, params);
  	return result.rows[0];
}


// Function to delete a user
async function deleteUser(username) {
  	await db.query(
		`DELETE FROM users WHERE username = $1`,
		[username]
  	);
}

export {
	createUser,
	getUserByUsername,
	getUserById,
	updateUser,
	deleteUser,
	signInUser
};