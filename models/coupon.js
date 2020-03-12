function CouponModel(id, libelle, description, dateFin, product) {
    this.id = id;
    this.libelle = libelle;
    this.product = product;
    this.description = description;
    this.dateFin = dateFin;

    return {
        id: this.id,
        libelle: this.libelle,
        product: this.product,
        description: this.description,
        dateFin: this.dateFin
    };
}

module.exports = CouponModel;
