const express = require('express');
const router = express.Router();
const { getAllTasks, getTaskByFilter, createTask, editTask, markTask } = require('../controllers/taskController');

router.get('/:status{/:search}', getAllTasks);
// router.get('/:status/:search?', getTaskByFilter);
router.post('/', createTask);
router.patch('/:task_id', editTask)
router.patch('/mark/:task_id', markTask)


module.exports = router