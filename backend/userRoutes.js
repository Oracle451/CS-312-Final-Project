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

// Update user
router.put('/:id', async (req, res) => {
	try {
		const user = await userModel.updateUser(req.params.id, req.body);
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete user
router.delete('/:id', async (req, res) => {
	await userModel.deleteUser(req.params.id);
	res.status(204).end();
});

module.exports = router;