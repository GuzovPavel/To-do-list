const express = require('express');
const router = express.Router();


const {
  getAllTasks,
  createNewTask,
  changeTask,
  deleteTask
} = require("../controllers/task.controller");

router.get('/allTasks', getAllTasks);
router.post('/createNewTask', createNewTask);
router.patch('/changeTask', changeTask);
router.delete('/deleteTask', deleteTask);

module.exports = router;