const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

const reportController = {
    getProjectStats: async (req, res) => {
        try {
            const stats = await Project.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                        averageProgress: { $avg: '$progress' }
                    }
                }
            ]);

            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getTeamPerformance: async (req, res) => {
        try {
            const performance = await Task.aggregate([
                {
                    $group: {
                        _id: '$assignedTo',
                        completedTasks: {
                            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] }
                        },
                        totalTasks: { $sum: 1 },
                        averageCompletionTime: {
                            $avg: {
                                $subtract: ['$updatedAt', '$createdAt']
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                }
            ]);

            res.json(performance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProjectTimeline: async (req, res) => {
        try {
            const timeline = await Project.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.params.projectId)
                    }
                },
                {
                    $lookup: {
                        from: 'tasks',
                        localField: '_id',
                        foreignField: 'project',
                        as: 'tasks'
                    }
                },
                {
                    $project: {
                        title: 1,
                        startDate: 1,
                        deadline: 1,
                        progress: 1,
                        taskTimeline: '$tasks'
                    }
                }
            ]);

            res.json(timeline);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = reportController;