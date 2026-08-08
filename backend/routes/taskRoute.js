const express = require('express');
const router = express.Router();
const { getAllTasks,  createTask, editTask, markTask, deleteTask } = require('../controllers/taskController');

router.get('/:status{/:search}', getAllTasks);

router.post('/', createTask);

router.patch('/:task_id', editTask)

router.patch('/mark/:task_id', markTask)

router.delete('/:task_id', deleteTask)


module.exports = router