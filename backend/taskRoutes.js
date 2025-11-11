const express = require('express');
const taskModel = require('./task');
const router = express.Router();

// Create task
router.post('/', async (req, res) => {
  try {
    const task = await taskModel.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all/filter/search tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks(req.query);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  const task = await taskModel.getTaskById(req.params.id);
  task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const task = await taskModel.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  await taskModel.deleteTask(req.params.id);
  res.status(204).end();
});

module.exports = router;