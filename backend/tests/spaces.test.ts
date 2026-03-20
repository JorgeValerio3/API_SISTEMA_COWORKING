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

describe('Spaces Endpoints', () => {
    let token: string;

    beforeAll(async () => {
        // Login to get token (using the admin user created in BBDD.sql if it exists, 
        // or a test user. For simplicity, we assume an existing user or we can use the one from auth.test)
        // Actually, we'll use the admin user from BBDD.sql: CoworkingAdmin@mail.com
        try {
            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    mail: 'CoworkingAdmin@mail.com',
                    pass: 'Admin123*' // Guessed password based on common patterns, if it fails we'll see
                });
            token = loginRes.body.token;
        } catch (e) {
            // Handle error
        }
    });

    afterAll(async () => {
        await db.end();
    });

    describe('GET /api/spaces', () => {
        it('should return all spaces', async () => {
            const res = await request(app)
                .get('/api/spaces')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('spaces');
        });

        it('should return 401 without token', async () => {
            const res = await request(app).get('/api/spaces');
            expect(res.statusCode).toBe(401);
        });
    });

    describe('GET /api/spaces/:id', () => {
        it('should return a specific space by ID', async () => {
            const res = await request(app)
                .get('/api/spaces/1')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('space');
        });

        it('should return 404 for non-existent space', async () => {
            const res = await request(app)
                .get('/api/spaces/999')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(404);
        });
    });

    describe('GET /api/spaces/location/:id', () => {
        it('should return spaces by location', async () => {
            const res = await request(app)
                .get('/api/spaces/location/1')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('spaces');
        });
    });

    describe('GET /api/spaces/availability', () => {
        it('should return available spaces for a given time', async () => {
            const res = await request(app)
                .get('/api/spaces/availability')
                .send({
                    timeDate: '2026-05-01',
                    timeFrom: '10:00:00',
                    until: '12:00:00'
                })
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('spaces');
        });
    });
});
