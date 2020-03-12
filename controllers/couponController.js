var sq = require("sqlite3");

var Coupon = {
    getCoupon: callback => db.query('SELECT * from utilisateur', callback),
};

module.exports = Coupon;
