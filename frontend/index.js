// index.js

// Required External Modules
const express = require("express")
const path = require("path")

// App Variables
const app = express()
const port = process.env.PORT || "8000"


// App configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Route Definitions
app.get("/", (req, res) => {
    res.render("index", { title: "Home" })
})

// Server Activation
app.listen(port, () => {
    console.log(`Listening for requests on http://localhost:${port}`)
})