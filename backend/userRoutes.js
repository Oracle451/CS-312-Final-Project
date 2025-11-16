const express = require('express');
const userModel = require('./user');
const router = express.Router();
let currentUser = "";

// Create user
router.post('/signup', async (req, res) => {
	try {
		const user = await userModel.createUser(req.body);
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get('/getCurrentUser', async (req, res) => {
	res.json(currentUser);
})

// Sign User in
router.post('/signin', async (req, res) => {
	try {
		const user = await userModel.signInUser(req.body);
		currentUser = user;
		res.status(202).json(user);
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
});

// Sign out user
router.post('/signout', async (req, res) => {
  try {
		currentUser = "";
		res.status(200).json({ message: "Signed out successfully" });
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
});

// Update user
router.put("/update/:username", async (req, res) => {
  const username = req.params.username;
  const { username: newUsername, full_name, password } = req.body;

  try {
    const updated = await userModel.updateUser(
      username,
      newUsername,
      full_name,
      password
    );

    res.json({ message: "User updated", user: updated });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
router.delete("/delete/:username", async (req, res) => {
  const username = req.params.username;
  currentUser = "";

  try {
    await userModel.deleteUser(username);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
	const user = await userModel.getUserByUsername(req.params.username);
	user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

// Get user by id
router.get('/:id', async (req, res) => {
	const user = await userModel.getUserById(req.params.id);
	user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});


module.exports = router;