// index.js

// Required External Modules
const express = require("express")
const path = require("path")

const sqlite3 = require("sqlite3").verbose()

// sqlite connection
let db = new sqlite3.Database('../ping-analytics.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.db database.');
});

// App Variables
const app = express()
const port = process.env.PORT || "8000"


// App configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))


// Route Definitions
app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

app.get("/user", (req, res) => {
    db.get(`SELECT ROWID, * FROM ping `, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        res.render("user", { 
            title: "profile", 
            userProfile: { 
                nickname: "Auth0",
                database: {
                    rowid: row.rowid,
                    time_est: row.est,
                    time_mdt: row.mdt,
                    time_ost: row.pst,
                    ping: row.ping_value
                }
            }
        })
        console.log(row.rowid)

    });


    // close db

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
})

// Server Activation
app.listen(port, () => {
    console.log(`Listening for requests on http://localhost:${port}`)
})

// close connection 
