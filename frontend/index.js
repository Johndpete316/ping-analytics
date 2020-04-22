// index.js

// Required External Modules
const express = require("express")
const path = require("path")

const expressSession = require("express-session")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")

require("dotenv").config()

const authRouter = require("./auth")

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

// Session configuration

const session = {
    secret: "LoxodontaElephasMammuthusPalaeoloxodonPrimelephas",
    cookie: {},
    resave: false,
    saveUninitialized: false
  };
  
if (app.get("env") === "production") {
    session.cookie.secure = true;
}

// Passport configuration

const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL || "http://localhost:8000/callback"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      /**
       * Access tokens are used to authorize users to an API
       * (resource server)
       * accessToken is the token to call the Auth0 API
       * or a secured third-party API
       * extraParams.id_token has the JSON Web Token
       * profile has all the information from the user
       */
      return done(null, profile);
    }
  );


// App configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))

app.use(expressSession(session))

passport.use(strategy)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});
  
app.use("/", authRouter);

app.use("/", authRouter);


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
