const fs = require("fs")
const sqlite3 = require('sqlite3')
const cron = require("node-cron")

cron.schedule('* * * * *', () => {
    console.log("get-database")
    get_database()
})


function get_database() {
    let db = new sqlite3.Database('../ping-analytics.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.db database.');
    });
    
    var sql = `SELECT ROWID, * FROM ping`
    
    db.all(sql, function(err, rows) {
        fs.writeFile('./data.json', JSON.stringify(rows), (err) => {
            console.log(err)
        })
        console.log("Database saved")
    });

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    console.error("test")

}


module.exports = get_database