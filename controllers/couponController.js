var sq = require("sqlite3");

let db = new sq.Database('./coupon.db');

var Coupon = {
    getAllCoupons: callback => {
        return db.all(`SELECT * FROM coupon`, [], callback);
    },
    getCoupon: (playlistId, callback) => {
        return db.get('SELECT * FROM coupon WHERE id = ?', [playlistId], callback);
    }
};

module.exports = Coupon;
