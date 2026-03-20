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

describe('Admin Endpoints', () => {
    let token: string;
    let adminUser = {
        membershipType_id: 3,
        name: 'Admin',
        lastname: 'User',
        mail: `adminuser_${Date.now()}@example.com`,
        pass: 'AdminPass123',
        age: 30
    };

    beforeAll(async () => {
        // Register user
        await request(app).post('/api/auth/register').send(adminUser);
        
        // Promote to Admin (role_id = 2)
        await db.query('UPDATE Users SET role_id = 2 WHERE mail = ?', [adminUser.mail]);
        
        // Login
        const loginRes = await request(app).post('/api/auth/login').send({
            mail: adminUser.mail,
            pass: adminUser.pass
        });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        try {
            await db.query('DELETE FROM Users WHERE mail = ?', [adminUser.mail]);
        } catch (e) {}
        await db.end();
    });

    describe('GET /api/admin/bookings', () => {
        it('should return all bookings in the system', async () => {
            const res = await request(app)
                .get('/api/admin/bookings')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('bookings');
        });
    });

    describe('GET /api/admin/stats', () => {
        it('should return system statistics', async () => {
            const res = await request(app)
                .get('/api/admin/stats')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('stats');
        });
    });

    describe('PUT /api/admin/spaces/:id', () => {
        it('should update space details', async () => {
            const res = await request(app)
                .put('/api/admin/spaces/1')
                .send({
                    until: '18:00:00' // Based on rAdmin.ts routes.put(/api/admin/spaces/:id, validate(extendBookingSchema, "body"))
                })
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
        });
    });
});
