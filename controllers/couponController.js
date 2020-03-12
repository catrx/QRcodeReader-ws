var sq = require("sqlite3");

let db = new sq.Database('./coupon.db');

var Coupon = {
    getAllCoupons: callback => {
        return db.all(`SELECT coupon.id, coupon.libelle, coupon.dateFin, coupon.description, produit.id, produit.libelle, produit.url FROM coupon, produit WHERE coupon.idProduit = produit.id`, [], callback);
    },
    getCoupon: (playlistId, callback) => {
        return db.get('SELECT * FROM coupon WHERE id = ?', [playlistId], callback);
    }
};

module.exports = Coupon;
