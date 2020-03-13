var CouponModel = require('../models/coupon');
var ProductModel = require('../models/product');

describe('Models', () => {
    it('should be generate product', () => {
        const product = new ProductModel(1, 'casque', 'http://casquestyle.com', 'trop swag');
        const productToCompare = {
            id: 1,
            libelle: 'casque',
            url: 'http://casquestyle.com',
            description: 'trop swag'
        };
        expect(JSON.stringify(product)).toEqual(JSON.stringify(productToCompare))
    })
});

describe('Models', () => {
    it('should be generate coupon', () => {
        const product = new ProductModel(1, 'casque', 'http://casquestyle.com', 'trop swag');
        const coupon = new CouponModel(1, '-50% sur le bonnet rouge', 'REDUC A NE PAS MANQUER POUR LA VICTOIRE DU PSG !! -50%', 1652678152678, product);

        const couponToCompare = {
            id: 1,
            libelle: '-50% sur le bonnet rouge',
            product: {
                id: 1,
                libelle: 'casque',
                url: 'http://casquestyle.com',
                description: 'trop swag'
            },
            description: 'REDUC A NE PAS MANQUER POUR LA VICTOIRE DU PSG !! -50%',
            dateFin: 1652678152678
        };
        expect(JSON.stringify(coupon)).toEqual(JSON.stringify(couponToCompare))
    })
});
