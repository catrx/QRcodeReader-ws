var express = require('express');
var router = express.Router();
var Coupon = require('../controllers/couponController');
var CouponModel = require('../models/coupon');
var ProductModel = require('../models/product');

/* GET coupons listing. */
router.get('/', (req, res, next) => {
    Coupon.getAllCoupons((err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            const coupons = rows.reduce((acc, row) => {
                const product = new ProductModel(row.idProduit, row.libelleProduit, row.url, row.produitDescription);
                const coupon = new CouponModel(row.id, row.libelle, row.description, row.dateFin, product);
                return acc.concat(coupon)
            }, []);
            res.json(coupons);
        }
    });
});

router.get('/:id', (req, res, next) => {
    Coupon.getCoupon(req.params.id, (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            if(rows) {
                const product = new ProductModel(rows.idProduit, rows.libelleProduit, rows.url, rows.produitDescription);
                const coupon = new CouponModel(rows.id, rows.libelle, rows.description, rows.dateFin, product);
                res.json(coupon);
            } else {
                res.json({});
            }
        }
    });
});


module.exports = router;
