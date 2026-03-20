import { jest } from '@jest/globals';

// Mock redis package to avoid connection errors during tests
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

describe('Authentication Endpoints', () => {
    let testUser = {
        membershipType_id: 1,
        name: 'Test',
        lastname: 'User',
        mail: `testuser_${Date.now()}@example.com`,
        pass: 'password123',
        age: 25
    };

    afterAll(async () => {
        // Cleanup test user if created
        try {
            await db.query('DELETE FROM Users WHERE mail = ?', [testUser.mail]);
        } catch (e) {
            // Silently fail if db is not connected
        }
        await db.end();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(testUser);
            
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 400 for invalid data', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({ mail: 'invalid-email' });
            
            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login correctly with valid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    mail: testUser.mail,
                    pass: testUser.pass
                });
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    mail: testUser.mail,
                    pass: 'wrongpassword'
                });
            
            expect(res.statusCode).toBe(401);
        });
    });

    describe('POST /api/auth/logout', () => {
        it('should logout correctly with a valid token', async () => {
            // First login to get a token
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    mail: testUser.mail,
                    pass: testUser.pass
                });
            
            const token = loginRes.body.token;

            const res = await request(app)
                .post('/api/auth/logout')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
        });

        it('should return 401 without token', async () => {
            const res = await request(app).post('/api/auth/logout');
            expect(res.statusCode).toBe(401);
        });
    });
});
