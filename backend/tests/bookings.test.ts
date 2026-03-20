import { jest } from '@jest/globals';

// Mock redis package
jest.unstable_mockModule('redis', () => ({
    __esModule: true,
    createClient: jest.fn(() => ({
        on: jest.fn(),
        connect: jest.fn(),
        isOpen: false,
        disconnect: jest.fn(),
        get: jest.fn(),
        setEx: jest.fn()
    })),
    default: {
        createClient: jest.fn(() => ({
            on: jest.fn(),
            connect: jest.fn(),
            isOpen: false,
            disconnect: jest.fn(),
            get: jest.fn(),
            setEx: jest.fn()
        }))
    }
}));

process.env.NODE_ENV = 'test';

const { default: request } = await import('supertest');
const appModule = await import('../app.js');
const app = appModule.default;
const { default: db } = await import('../config/db.js');

describe('Booking Endpoints', () => {
    let token: string;
    let testUser = {
        membershipType_id: 1,
        name: 'Booking',
        lastname: 'Test',
        mail: `bookinguser_${Date.now()}@example.com`,
        pass: 'password123',
        age: 25
    };

    beforeAll(async () => {
        // Create test user and login
        await db.query('INSERT INTO Users (membershipType_id, role_id, dateCreate, name, lastname, mail, password, age) VALUES (?, 1, NOW(), ?, ?, ?, ?, ?)', 
            [testUser.membershipType_id, testUser.name, testUser.lastname, testUser.mail, 'hashed_password_placeholder', testUser.age]);
        
        // Since we can't easily hash password in DB insert via SQL for bcrypt, we'll login via API
        // Wait, we'll just register via API
        await request(app).post('/api/auth/register').send(testUser);
        const loginRes = await request(app).post('/api/auth/login').send({ mail: testUser.mail, pass: testUser.pass });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        try {
            await db.query('DELETE FROM Bookings WHERE user_id = (SELECT user_id FROM Users WHERE mail = ?)', [testUser.mail]);
            await db.query('DELETE FROM Users WHERE mail = ?', [testUser.mail]);
        } catch (e) {}
        await db.end();
    });

    describe('POST /api/bookings', () => {
        it('should create a new booking', async () => {
            const res = await request(app)
                .post('/api/bookings')
                .send({
                    spaces_id: 1,
                    timeDate: '2026-06-01',
                    timeFrom: '08:00:00',
                    until: '10:00:00',
                    numberPersons: 1
                })
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('booking_id');
        });
    });

    describe('GET /api/bookings', () => {
        it('should return all bookings for the user', async () => {
            const res = await request(app)
                .get('/api/bookings')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('bookings');
        });
    });
});
