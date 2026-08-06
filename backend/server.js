const express = require('express');
require('dotenv').config();
const app = express();
require('./config/dbcon');
const taskRoutes = require('./routes/taskRoute');

app.use(express.json());

app.use('/api/task', taskRoutes);

app.listen(process.env.PORT, () => {
    console.log('Listening to Port: ' + process.env.PORT);
})