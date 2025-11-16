const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Require the routes for the user and task routes files
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Set route for the users and tasks api files
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Set the port for the backend
const PORT = 3001;

// Begin Listening on the server and print a message 
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});