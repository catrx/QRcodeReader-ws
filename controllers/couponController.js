var sq = require("sqlite3");

let db = new sq.Database("./coupon.db");

var Coupon = {
    getAllCoupons: callback => {
        return db.all(
            `SELECT coupon.id, coupon.libelle, coupon.dateFin, coupon.description, coupon.idProduit, produit.libelle AS libelleProduit, produit.url, produit.description AS produitDescription FROM coupon, produit WHERE coupon.idProduit = produit.id AND dateFin >= dateDebut`,
            [],
            callback
        );
    },
    getCoupon: (playlistId, callback) => {
        return db.get(
            "SELECT coupon.id, coupon.libelle, coupon.dateFin, coupon.description, coupon.idProduit, produit.libelle AS libelleProduit, produit.url, produit.description AS produitDescription FROM coupon, produit WHERE coupon.idProduit = produit.id AND coupon.id = ? AND dateFin >= dateDebut",
            [playlistId],
            callback
        );
    }
};

module.exports = Coupon;
