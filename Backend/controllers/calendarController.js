const CalendarEvent = require('../models/CalendarEvent');
const { createNotification } = require('../utils/notifications');

const calendarController = {
    createEvent: async (req, res) => {
        try {
            const event = new CalendarEvent({
                ...req.body,
                createdBy: req.user._id
            });
            await event.save();

            // Notify attendees
            if (event.attendees && event.attendees.length > 0) {
                event.attendees.forEach(async (attendee) => {
                    await createNotification(
                        attendee.user,
                        'calendar_invitation',
                        'Calendar Invitation',
                        `You have been invited to: ${event.title}`,
                        event._id,
                        'CalendarEvent'
                    );
                });
            }

            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getEvents: async (req, res) => {
        try {
            const { start, end } = req.query;
            const query = {
                $or: [
                    { createdBy: req.user._id },
                    { 'attendees.user': req.user._id }
                ]
            };

            if (start && end) {
                query.startDate = { $gte: new Date(start) };
                query.endDate = { $lte: new Date(end) };
            }

            const events = await CalendarEvent.find(query)
                .populate('createdBy', 'name email')
                .populate('attendees.user', 'name email')
                .populate('project', 'title')
                .populate('task', 'title');

            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEventResponse: async (req, res) => {
        try {
            const { eventId } = req.params;
            const { status } = req.body;

            const event = await CalendarEvent.findById(eventId);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            const attendee = event.attendees.find(
                a => a.user.toString() === req.user._id.toString()
            );

            if (!attendee) {
                return res.status(400).json({ error: 'User is not invited to this event' });
            }

            attendee.status = status;
            await event.save();

            // Notify event creator
            await createNotification(
                event.createdBy,
                'calendar_response',
                'Event Response',
                `${req.user.name} has ${status} your event: ${event.title}`,
                event._id,
                'CalendarEvent'
            );

            res.json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const event = await CalendarEvent.findOneAndDelete({
                _id: req.params.id,
                createdBy: req.user._id
            });

            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Notify attendees about cancellation
            event.attendees.forEach(async (attendee) => {
                await createNotification(
                    attendee.user,
                    'calendar_cancellation',
                    'Event Cancelled',
                    `Event "${event.title}" has been cancelled`,
                    event._id,
                    'CalendarEvent'
                );
            });

            res.json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = calendarController;