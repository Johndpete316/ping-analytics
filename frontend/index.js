// index.js

// Required External Modules
const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3").verbose()

const data = require("./data.json")

const get_database = require("./tools")

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

// App Variables
const app = express()
const port = process.env.PORT || "8000"


// App configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))
app.use(expressLogger)


// Route Definitions
app.get("/", (req, res) => {
    logger.debug(`${req.ip} sent GET to /}`)
    
    res.render("ping-project/index", { title: "Home" })

})

app.get("/ping", (req, res) => {
    logger.debug(`${req.ip} sent GET to /ping}`)

    res.render("ping-project/ping", {
        title: "ping project",
        data: data
    })
})

app.get("/high-ping", (req, res) => {
    logger.debug(`${req.ip} sent GET to /high-ping}`)
    

    let db = new sqlite3.Database('../ping-analytics.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.db database.');
    });


    db.get(`SELECT MAX(ping_value) AS ping_value, *, ROWID FROM ping`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        res.render("ping-project/ping-high", { 
            title: "profile", 
            userProfile: { 
                nickname: "Auth0",
                database: {
                    rowid: row.rowid,
                    time_est: row.est,
                    time_mdt: row.mdt,
                    time_pst: row.pst,
                    ping: row.ping_value
                }
            }
        })

    });


    // close db

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
})

app.get("/low-ping", (req, res) => {
    logger.debug(`${req.ip} sent GET to /low-ping}`)


    let db = new sqlite3.Database('../ping-analytics.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.db database.');
    });


    db.get(`SELECT MIN(ping_value) AS ping_value, *, ROWID FROM ping`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        res.render("ping-project/ping-low", { 
            title: "Lowest Ping", 
            userProfile: { 
                username: "Auth0",
                database: {
                    rowid: row.rowid,
                    time_est: row.est,
                    time_mdt: row.mdt,
                    time_pst: row.pst,
                    ping: row.ping_value
                }
            }
        })

    });


    // close db

    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
})


app.get("/development", (req, res) => {
    logger.debug(`${req.ip} sent GET to /development}`)

    res.render("ping-project/development", {
        title: "development",
        data: data
    })
})


// Server Activation
app.listen(port, () => {
    logger.debug(`Server is listening on port ${port}`)
    console.log(`Listening for requests on http://localhost:${port}`)
})

// close connection 
