const Team = require('../models/Team');
const User = require('../models/User');
const { createNotification } = require('../utils/notifications');

const teamController = {
    createTeam: async (req, res) => {
        try {
            const team = new Team({
                ...req.body,
                leader: req.user._id,
                members: [{ user: req.user._id, role: 'leader' }]
            });
            await team.save();

            // Update user's teams
            await User.findByIdAndUpdate(req.user._id, {
                $push: { teams: team._id }
            });

            res.status(201).json(team);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getTeams: async (req, res) => {
        try {
            const teams = await Team.find({ active: true })
                .populate('leader', 'name email')
                .populate('members.user', 'name email')
                .populate('projects', 'title status');
            res.json(teams);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    addMember: async (req, res) => {
        try {
            const { teamId, userId, role } = req.body;
            const team = await Team.findById(teamId);

            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }

            // Check if user is already a member
            if (team.members.some(member => member.user.toString() === userId)) {
                return res.status(400).json({ error: 'User is already a team member' });
            }

            team.members.push({ user: userId, role: role || 'member' });
            await team.save();

            // Update user's teams
            await User.findByIdAndUpdate(userId, {
                $push: { teams: teamId }
            });

            // Notify user
            await createNotification(
                userId,
                'team_invitation',
                'Team Invitation',
                `You have been added to team: ${team.name}`,
                team._id,
                'Team'
            );

            res.json(team);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    removeMember: async (req, res) => {
        try {
            const { teamId, userId } = req.params;
            const team = await Team.findById(teamId);

            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }

            team.members = team.members.filter(
                member => member.user.toString() !== userId
            );
            await team.save();

            // Update user's teams
            await User.findByIdAndUpdate(userId, {
                $pull: { teams: teamId }
            });

            res.json(team);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateTeam: async (req, res) => {
        try {
            const updates = Object.keys(req.body);
            const allowedUpdates = ['name', 'description', 'department'];
            const isValidOperation = updates.every(update => 
                allowedUpdates.includes(update)
            );

            if (!isValidOperation) {
                return res.status(400).json({ error: 'Invalid updates!' });
            }

            const team = await Team.findById(req.params.id);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }

            updates.forEach(update => team[update] = req.body[update]);
            await team.save();

            res.json(team);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = teamController;