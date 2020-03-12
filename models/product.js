function ProductModel (id, libelle, url, description ) {
    this.id = id;
    this.libelle = libelle;
    this.url = url;
    this.description = description;

    return {
        id: this.id,
        libelle: this.libelle,
        url: this.url,
        description: this.description
    };
}

module.exports = ProductModel;
