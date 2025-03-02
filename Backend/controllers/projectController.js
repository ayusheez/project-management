const Project = require('../models/Project');
const { createNotification } = require('../utils/notifications');

const projectController = {
    createProject: async (req, res) => {
        try {
            const project = new Project({
                ...req.body,
                owner: req.user._id
            });
            await project.save();

            // Notify team members
            if (project.members && project.members.length > 0) {
                project.members.forEach(async (member) => {
                    await createNotification(
                        member.user,
                        'project_update',
                        'New Project Assignment',
                        `You have been added to project: ${project.title}`,
                        project._id,
                        'Project'
                    );
                });
            }

            res.status(201).json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getProjects: async (req, res) => {
        try {
            const match = {};
            const sort = {};

            if (req.query.status) match.status = req.query.status;
            if (req.query.sortBy) {
                const parts = req.query.sortBy.split(':');
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            }

            const projects = await Project.find(match)
                .populate('owner', 'name email')
                .populate('manager', 'name email')
                .populate('members.user', 'name email')
                .sort(sort);

            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateProject: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'status', 'priority', 'deadline', 'members'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        try {
            const project = await Project.findById(req.params.id);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            updates.forEach(update => project[update] = req.body[update]);
            await project.save();

            res.json(project);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteProject: async (req, res) => {
        try {
            const project = await Project.findByIdAndDelete(req.params.id);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = projectController;