const request = require('supertest');
const app = require('../app');

describe('Get Endpoints', () => {
    it('should get all coupons', async () => {
        const res = await request(app)
            .get('/coupon');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    })
});

describe('Get Endpoints', () => {
    it('should get coupon with id 2', async () => {
        const res = await request(app)
            .get('/coupon/2');
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(2);
    })
});

describe('Get Endpoints', () => {
    it('should send 404 error', async () => {
        const res = await request(app)
            .get('/coupon/35');
        expect(res.statusCode).toEqual(404);
    })
});
