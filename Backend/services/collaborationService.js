const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

class CollaborationService {
    static async trackUserActivity(userId, projectId, activity) {
        try {
            const timestamp = new Date();
            const user = await User.findById(userId);
            const activityData = {
                user: user.name,
                action: activity,
                timestamp
            };

            global.socketService.broadcastProjectUpdate(projectId, {
                type: 'activity',
                data: activityData
            });
        } catch (error) {
            console.error('Error tracking user activity:', error);
        }
    }

    static async notifyTeamMembers(projectId, notification) {
        try {
            const project = await Project.findById(projectId)
                .populate('members.user', 'name email');

            project.members.forEach(member => {
                global.socketService.notifyUser(member.user._id, 'notification', notification);
            });
        } catch (error) {
            console.error('Error notifying team members:', error);
        }
    }

    static async broadcastTaskChanges(taskId, changes) {
        try {
            const task = await Task.findById(taskId)
                .populate('project')
                .populate('assignedTo', 'name');

            global.socketService.broadcastTaskUpdate(task.project._id, {
                taskId,
                changes,
                updatedBy: task.assignedTo.name
            });
        } catch (error) {
            console.error('Error broadcasting task changes:', error);
        }
    }
}

module.exports = CollaborationService;