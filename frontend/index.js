// Required External Modules
const express = require("express")
const path = require("path")
const wrap = require('./wraper')

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

// Route Definitions
app.get("/", async (req, res) => {

    res.render("ping-project/index", {
        title: "Home"
    })

})

app.get("/ping", wrap( async (req, res, next) => {
    await client.connect()
    cursor = client.db("ping").collection("ping").find({/*all*/}).sort( { _id: -1} )
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
            data: row
        }
    })

    
}))

app.get("/low-ping", wrap(async (req, res, next) => {
    await client.connect()
    cursor = client.db("ping").collection("ping").find({
        ping_value: { $lt: 45 }
    })
    row = await cursor.toArray()
    console.log(row)
    res.render("ping-project/ping-low", {
        title: "Low Ping",
        userProfile: {
            data: row
        }
    })
}))


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
