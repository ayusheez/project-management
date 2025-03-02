const Task = require('../models/Task');
const { createNotification, sendEmail } = require('../utils/notifications');

const taskController = {
    createTask: async (req, res) => {
        try {
            const task = new Task({
                ...req.body,
                createdBy: req.user._id
            });
            await task.save();

            // Notify assigned user
            if (task.assignedTo) {
                await createNotification(
                    task.assignedTo,
                    'task_assigned',
                    'New Task Assigned',
                    `You have been assigned to task: ${task.title}`,
                    task._id,
                    'Task'
                );
            }

            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getTasks: async (req, res) => {
        try {
            const match = {};
            const sort = {};

            if (req.query.status) match.status = req.query.status;
            if (req.query.priority) match.priority = req.query.priority;
            if (req.query.sortBy) {
                const parts = req.query.sortBy.split(':');
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            }

            const tasks = await Task.find(match)
                .populate('assignedTo', 'name email')
                .populate('project', 'title')
                .sort(sort)
                .limit(parseInt(req.query.limit))
                .skip(parseInt(req.query.skip));

            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateTask: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'status', 'priority', 'dueDate', 'assignedTo'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }

            updates.forEach(update => task[update] = req.body[update]);
            await task.save();

            // Notify relevant users about the update
            if (task.assignedTo) {
                await createNotification(
                    task.assignedTo,
                    'task_updated',
                    'Task Updated',
                    `Task "${task.title}" has been updated`,
                    task._id,
                    'Task'
                );
            }

            res.json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = taskController;