const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            CONSTRAINT email_unique UNIQUE (email)
        )`, (err) => {
            if (err) {
            } else {
                var insert = 'INSERT INTO user (name, email) VALUES (?,?)'
                db.run(insert, ["admin","admin@example.com"])
                db.run(insert, ["user","user@example.com"])
            }
        });
    }
});

module.exports = db;
