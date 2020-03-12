var db = require('../db');

var Coupon = {
    getCoupon: callback => db.query('SELECT * from utilisateur', callback),
};

module.exports = Coupon;
