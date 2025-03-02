const request = require('supertest');
const app = require('../server');
const CalendarEvent = require('../models/CalendarEvent');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

describe('Calendar Controller Tests', () => {
    let token;
    let user;
    let testEvent;

    beforeEach(async () => {
        user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        token = generateToken(user._id);

        testEvent = {
            title: 'Test Event',
            description: 'Test Description',
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000),
            type: 'meeting',
            attendees: []
        };
    });

    describe('POST /api/calendar', () => {
        it('should create a new calendar event', async () => {
            const response = await request(app)
                .post('/api/calendar')
                .set('Authorization', `Bearer ${token}`)
                .send(testEvent);

            expect(response.status).toBe(201);
            expect(response.body.title).toBe(testEvent.title);
            expect(response.body.createdBy).toBe(user._id.toString());
        });

        it('should fail if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/calendar')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    description: 'Test Description'
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/calendar', () => {
        beforeEach(async () => {
            await CalendarEvent.create({
                ...testEvent,
                createdBy: user._id
            });
        });

        it('should get user events', async () => {
            const response = await request(app)
                .get('/api/calendar')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0].title).toBe(testEvent.title);
        });

        it('should filter events by date range', async () => {
            const response = await request(app)
                .get('/api/calendar')
                .query({
                    start: new Date(Date.now() - 86400000),
                    end: new Date(Date.now() + 172800000)
                })
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
        });
    });
});