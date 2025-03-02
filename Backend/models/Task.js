const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['To-Do', 'In Progress', 'In Review', 'Completed'],
        default: 'To-Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        required: true
    },
    attachments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    dependencies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    estimatedHours: Number,
    actualHours: Number,
    tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);