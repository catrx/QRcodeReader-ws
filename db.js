var sq = require("sqlite3");

const DB_PATH = "./coupon.db";

var dbSchema = `CREATE TABLE IF NOT EXISTS produit (
    id INTEGER PRIMARY KEY, 
    libelle TEXT, 
    url TEXT, 
    description TEXT);

    CREATE TABLE IF NOT EXISTS coupon (
    id INTEGER PRIMARY KEY, 
    libelle TEXT, 
    description TEXT,
    dateDebut DATETIME,
    dateFin DATETIME, 
    idProduit INTEGER, 
    FOREIGN KEY(idProduit) REFERENCES produit(id)
    )`;

const initDB = () => {
    const db = new sq.Database(DB_PATH, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Connected to " + DB_PATH + " database.");

        db.exec("PRAGMA foreign_keys = ON;", error => {
            if (error) {
                console.error("Pragma statement didn't work.");
            } else {
                console.log("Foreign Key Enforcement is on.");
            }
        });
    });
    db.exec(dbSchema, err => {
        if (err) {
            console.log(err);
        }
    });
    db.all("SELECT id, libelle, url, description FROM produit", (err, row) => {
        if (err) {
            console.log(err);
        } else {
            if (row.length === 0) {
                var stmt = db.prepare("INSERT INTO produit VALUES (?, ?, ?, ?)");
                var obj = [
                    {
                        id: 1,
                        libelle: "SkateBoard",
                        url: "https://www.gifi.fr/media/catalog/product/cache/1/image/1000x/9df78eab33525d08d6e5fb8d27136e95/5/4/549274.jpg",
                        description: "petit skateboard des familles"
                    },
                    {
                        id: 2,
                        libelle: "Jogging PSG",
                        url: "https://www.footkorner.com/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/f/o/footkorner-survetement-psg-blanc-bleu-2019-2020-at3093-100.jpg",
                        description: "pour faire des petits jogging des familles, ALLEZ PARIS !!"
                    },
                    {
                        id: 3,
                        libelle: "Vélo",
                        url: "https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/d/2/b/d2baa29159_50154508_skoda-klement-4.jpg",
                        description: "Pour de belles randonnées !!"
                    },
                    {
                        id: 4,
                        libelle: "Nike Air Vapormax",
                        url: "https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/tzmbw4poatl4g2bt88ym/chaussure-air-vapormax-flyknit-utility-K39FLM.jpg",
                        description: "Pour courir plus vite que la lumière!"
                    },
                    {
                        id: 5,
                        libelle: "Bonnet",
                        url: "https://cdn.leslipfrancais.fr/23182-product_medium_2x/le-indispensable-marine-bonnet-marine.jpg",
                        description: "Quand il fait froid !"
                    }
                ];
                for (var i in obj) {
                    stmt.run(
                        obj[i].id,
                        obj[i].libelle,
                        obj[i].url,
                        obj[i].description
                    );
                }
                stmt.finalize();
                stmt = db.prepare("INSERT INTO coupon VALUES (?, ?, ?, ?, ?, ?)");
                obj = [
                    {
                        id: 1,
                        libelle: "REDUCTION SKATEBOARDS",
                        description: "REDUCTION DE MALADE POUR LES SKATEBOARDS -30%",
                        dateDebut: new Date(),
                        dateFin: new Date(),
                        idProduit: 1
                    },
                    {
                        id: 2,
                        libelle: "REDUC PSG",
                        description: "REDUC A NE PAS MANQUER POUR LA VICTOIRE DU PSG !! -50%",
                        dateDebut: new Date(),
                        dateFin: new Date(),
                        idProduit: 2
                    },
                    {
                        id: 3,
                        libelle: "REDUCTION CHAUSSURE NIKE",
                        description: "NIKE VAPOR MAX A -20%",
                        dateDebut: new Date(),
                        dateFin: new Date(),
                        idProduit: 3
                    },
                    {
                        id: 4,
                        libelle: "A VA FAIRE FROID ",
                        description: "C'EST L'HIVER -30% SUR TOUT LES BONNETS",
                        dateDebut: new Date(),
                        dateFin: new Date(),
                        idProduit: 4
                    }
                ];
                for (var z in obj) {
                    stmt.run(
                        obj[z].id,
                        obj[z].libelle,
                        obj[z].description,
                        obj[z].dateDebut,
                        obj[z].dateFin,
                        obj[z].idProduit
                    );
                }
                stmt.finalize();
            } else {
                console.log("Database already exists");
            }
        }
    });
    /*db.all(
        "SELECT id, libelle, description, dateDebut, dateFin, idProduit FROM coupon",
        (err, row) => {
            if (err) {
                console.log(err);
            } else {
                if (row.length === 0) {
                    var stmt = db.prepare("INSERT INTO coupon VALUES (?, ?, ?, ?, ?, ?)");
                    var obj = [
                        {
                            id: 1,
                            libelle: "reducdeouf",
                            description: "LastName",
                            dateDebut: "01/01/2020",
                            dateFin: "01/02/2020",
                            idProduit: 6
                        },
                        {
                            id: 2,
                            libelle: "reducpastropouf",
                            description: "LastName",
                            dateDebut: "01/01/2020",
                            dateFin: "01/02/2020",
                            idProduit: 6
                        }
                    ];
                    for (var i in obj) {
                        stmt.run(
                            obj[i].id,
                            obj[i].libelle,
                            obj[i].description,
                            obj[i].dateDebut,
                            obj[i].dateFin,
                            obj[i].idProduit
                        );
                    }
                    stmt.finalize();
                } else {
                    console.log("Database already exists");
                }
            }
        }
    );*/
};

module.exports = initDB;
