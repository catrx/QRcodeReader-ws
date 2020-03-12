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
    dateDebut TEXT, 
    dateFin TEXT, 
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
                        url: "ezhfncz",
                        description: "petit skateboard des familles"
                    },
                    {
                        id: 2,
                        libelle: "Jogging",
                        url: "ezhfncz",
                        description: "pour faire des petits jogging des familles"
                    },
                    {
                        id: 3,
                        libelle: "Vélo",
                        url: "ezhfncz",
                        description: "lollol"
                    },
                    {
                        id: 4,
                        libelle: "Surf",
                        url: "ezhfncz",
                        description: "lollol"
                    },
                    {
                        id: 5,
                        libelle: "Bonnet",
                        url: "ezJKfncz",
                        description: "lokrfllol"
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
                        libelle: "reducdeouf",
                        description: "LastName",
                        dateDebut: "01/01/2020",
                        dateFin: "01/02/2020",
                        idProduit: 1
                    },
                    {
                        id: 2,
                        libelle: "reducpastropouf",
                        description: "LastName",
                        dateDebut: "01/01/2020",
                        dateFin: "01/02/2020",
                        idProduit: 2
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
