const socketIO = require('socket.io');

class SocketService {
    constructor(server) {
        this.io = socketIO(server);
        this.userSockets = new Map();

        this.io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('authenticate', (userId) => {
                this.userSockets.set(userId, socket.id);
                socket.join(`user_${userId}`);
            });

            socket.on('joinProject', (projectId) => {
                socket.join(`project_${projectId}`);
            });

            socket.on('leaveProject', (projectId) => {
                socket.leave(`project_${projectId}`);
            });

            socket.on('disconnect', () => {
                for (let [userId, socketId] of this.userSockets.entries()) {
                    if (socketId === socket.id) {
                        this.userSockets.delete(userId);
                        break;
                    }
                }
                console.log('Client disconnected');
            });
        });
    }

    notifyUser(userId, event, data) {
        const socketId = this.userSockets.get(userId);
        if (socketId) {
            this.io.to(socketId).emit(event, data);
        }
    }

    notifyProject(projectId, event, data) {
        this.io.to(`project_${projectId}`).emit(event, data);
    }

    broadcastProjectUpdate(projectId, data) {
        this.notifyProject(projectId, 'projectUpdate', data);
    }

    broadcastTaskUpdate(projectId, data) {
        this.notifyProject(projectId, 'taskUpdate', data);
    }

    broadcastComment(projectId, data) {
        this.notifyProject(projectId, 'newComment', data);
    }
}

module.exports = SocketService;