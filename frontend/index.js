// index.js

// Required External Modules
const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3").verbose()

const data = require("./data.json")

const { setupDB, findHighestPing} = require("./mongodb")
const wrap = require('./wraper')


const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
    level: process.env.LOG_LEVEL || 'info'
});

// App Variables
const app = express()
const port = process.env.PORT || "8000"


// App configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))


//configure mongodb
const { MongoClient } = require('mongodb');
const { password, uri } = require("../config.json")

const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});






// mongoDB functions



// Route Definitions
app.get("/", async (req, res) => {
    logger.debug(`${req.ip} sent GET to /}`)

    res.render("ping-project/index", {
        title: "Home"
    })

})

app.get("/ping", wrap( async (req, res, next) => {
    logger.debug(`${req.ip} sent GET to /ping}`)
    await client.connect()
    cursor = client.db("ping").collection("ping").find({/*all*/})
    row = await cursor.toArray()
    console.log(row)

    res.render("ping-project/ping", {
        title: "ping project",
        data: row
    })
}))

app.get("/high-ping", wrap(async (req, res, next) => {
    await client.connect()
    cursor = client.db("ping").collection("ping").find({
        ping_value: { $gt: 500}
    })
    row = await cursor.toArray()
    console.log(row)
    res.render("ping-project/ping-high", {
        title: "High Ping",
        userProfile: {
            database: {
                rowid: row[0]._id,
                time_est: row[0].est,
                time_mdt: row[0].mdt,
                time_pst: row[0].pst,
                ping: row[0].ping_value
            },
            data: row
        }
    })

    
}))

app.get("/low-ping", (req, res) => {


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


app.get("/development", (req, res) => {``

    res.render("ping-project/development", {
        title: "development",
        data: data
    })
})


// Server Activation
app.listen(port, () => {
    console.log(`Listening for requests on http://localhost:${port}`)
})

// close connection 