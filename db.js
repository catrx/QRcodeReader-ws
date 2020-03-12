var sq = require("sqlite3");

const DB_PATH = "./coupon.db";

var dbSchema = `CREATE TABLE IF NOT EXISTS produit (
    id INTEGER PRIMARY KEY, 
    libelle TEXT, 
    handle TEXT, 
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
    db.all("SELECT id, libelle, handle, description FROM produit", (err, row) => {
        if (err) {
            console.log(err);
        } else {
            if (row.length === 0) {
                var stmt = db.prepare("INSERT INTO produit VALUES (?, ?, ?, ?)");
                var obj = [
                    {
                        id: 1,
                        libelle: "SkateBoard",
                        handle: "ezhfncz",
                        description: "lollol"
                    },
                    {
                        id: 2,
                        libelle: "Bonnet",
                        handle: "ezJKfncz",
                        description: "lokrfllol"
                    }
                ];
                for (var i in obj) {
                    stmt.run(
                        obj[i].id,
                        obj[i].libelle,
                        obj[i].handle,
                        obj[i].description
                    );
                }
                stmt.finalize();
            } else {
                console.log("Database already exists");
            }
        }
    });
    db.all(
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
                            idProduit: 1
                        },
                        {
                            id: 2,
                            libelle: "reducpastropouf",
                            description: "LastName",
                            dateDebut: "01/01/2020",
                            dateFin: "01/02/2020",
                            idProduit: 1
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
    );
};

module.exports = initDB;
