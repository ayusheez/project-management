import io from 'socket.io-client';

class SocketClient {
    constructor() {
        this.socket = null;
        this.handlers = new Map();
    }

    connect(userId) {
        this.socket = io(process.env.REACT_APP_API_URL);
        
        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            this.socket.emit('authenticate', userId);
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.socket.on('notification', (data) => {
            this.triggerHandler('notification', data);
        });

        this.socket.on('projectUpdate', (data) => {
            this.triggerHandler('projectUpdate', data);
        });

        this.socket.on('taskUpdate', (data) => {
            this.triggerHandler('taskUpdate', data);
        });

        this.socket.on('newComment', (data) => {
            this.triggerHandler('newComment', data);
        });
    }

    joinProject(projectId) {
        this.socket.emit('joinProject', projectId);
    }

    leaveProject(projectId) {
        this.socket.emit('leaveProject', projectId);
    }

    on(event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event).push(handler);
    }

    off(event, handler) {
        if (this.handlers.has(event)) {
            const handlers = this.handlers.get(event);
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }

    triggerHandler(event, data) {
        if (this.handlers.has(event)) {
            this.handlers.get(event).forEach(handler => handler(data));
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new SocketClient();