const express = require('express');
const taskModel = require('./task');
const router = express.Router();

// Route to get all tasks
router.get("/AllTasks/:ordering", async (req, res) => {
	try {
		// Removes the colon and gets the value (e.g. "title")
		const ordering = req.params.ordering?.replace(":", "") || "created_at";

		const tasks = await taskModel.GetAllTasks(ordering);
		res.json(tasks);

	} catch (err) {
		console.error("Error fetching tasks:", err);
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
});

// Route to get overdue tasks
router.get("/overdue", async (req, res) => {
	try {
		const tasks = await taskModel.getOverdueTasks();
		res.json(tasks);
	} catch (err) {
		console.error("Error fetching overdue tasks:", err);
		res.status(500).json({ error: "Failed to fetch overdue tasks" });
	}
});

// Route to get completed tasks
router.get("/completed", async (req, res) => {
	try {
		const tasks = await taskModel.getCompletedTasks();
		res.json(tasks);
	} catch (err) {
		console.error("Error fetching completed tasks:", err);
		res.status(500).json({ error: "Failed to fetch completed tasks" });
	}
});

// Route to get upcoming tasks
router.get("/upcoming", async (req, res) => {
	try {
		const tasks = await taskModel.getUpcomingTasks();
		res.json(tasks);
	} catch (err) {
		console.error("Error fetching upcoming tasks:", err);
		res.status(500).json({ error: "Failed to fetch upcoming tasks" });
	}
});

// Route to search tasks by name
router.get('/search', async (req, res) => {
	const q = req.query.q;
	try {
		const results = await taskModel.searchTasksByTitle(q);
		res.json(results);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Create task
router.post('/', async (req, res) => {
	try {
		const task = await taskModel.createTask(req.body);
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Update task
router.put('/update/:id', async (req, res) => {
	try {
		const task = await taskModel.updateTask(req.params.id, req.body);
		res.json(task);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete task
router.delete('/delete/:id', async (req, res) => {
	await taskModel.deleteTask(req.params.id);
	res.status(204).end();
});

// Route to get user tasks 
router.get("/myTasks/:username", async (req, res) => {
	const username = req.params.username;

	try {
		const tasks = await taskModel.getTasksByUser(username);
		res.json(tasks);
	} catch (err) {
		console.error("Error fetching user's tasks:", err);
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
});

// Get single task
router.get('/:id', async (req, res) => {
	const task = await taskModel.getTaskById(req.params.id);
	task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
});

module.exports = router;