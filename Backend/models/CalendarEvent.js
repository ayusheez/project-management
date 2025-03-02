const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    allDay: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['meeting', 'deadline', 'milestone', 'other'],
        default: 'other'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    attendees: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'declined'],
            default: 'pending'
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recurrence: {
        frequency: String,
        interval: Number,
        endAfter: Number
    },
    reminders: [{
        time: Number,
        unit: {
            type: String,
            enum: ['minutes', 'hours', 'days']
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);