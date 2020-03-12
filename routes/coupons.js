var express = require('express');
var router = express.Router();
var Coupon = require('../controllers/couponController')

/* GET coupons listing. */
router.get('/', (req, res, next) => {
    Coupon.getAllCoupons((err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res, next) => {
    Coupon.getCoupon(req.params.id, (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});


module.exports = router;
