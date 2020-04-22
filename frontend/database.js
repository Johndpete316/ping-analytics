const sqlite3 = require("sqlite3").verbose()
const fs = require("fs")

function get_db() {
    let db = new sqlite3.Database('../ping-analytics.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.db database.');
    });
    

    db.each(`SELECT ROWID, * FROM ping `, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        let object[row.rowid] = new Object
        object[row.rowid] = {
            est: row.est,
            mdt: row.mdt,
            pst: row.pst,
            ping: row.ping_value
        }
        fs.writeFile('./object.json', JSON.stringify(object[row.rowid]), (err) => {
            if(err) console.log(err);
        })
        
    });
    

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });


}

row = get_db()
console.log(row)

module.exports = get_db