const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.patch('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, authorize('admin', 'manager'), taskController.deleteTask);

module.exports = router;