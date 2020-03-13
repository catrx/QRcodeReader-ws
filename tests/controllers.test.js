var Coupon = require('../controllers/couponController');

describe('Get Datas', () => {
    it('should get all coupons', async () => {
        await Coupon.getAllCoupons((err, rows) => {
           expect(rows.length).toEqual(3)
        });
    })
});

describe('Get Datas', () => {
    it('should get coupon with id 2', async () => {
        await Coupon.getCoupon(2,(err, rows) => {
            expect(rows.id).toEqual(2)
        });
    })
});

describe('Get Datas', () => {
    it('should get coupon with id 78', () => {
        Coupon.getCoupon(78,(err, rows) => {
            expect(rows).toEqual(undefined)
        });
    })
});
