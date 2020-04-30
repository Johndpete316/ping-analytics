"use strict";

// index.js
// Required External Modules
var express = require("express");

var path = require("path");

var sqlite3 = require("sqlite3").verbose();

var data = require("./data.json");

var _require = require("./mongodb"),
    setupDB = _require.setupDB,
    findHighestPing = _require.findHighestPing;

var wrap = require('./wraper');

var pino = require('pino');

var expressPino = require('express-pino-logger');

var logger = pino({
  level: process.env.LOG_LEVEL || 'info'
}); // App Variables

var app = express();
var port = process.env.PORT || "8000"; // App configuration

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express["static"](path.join(__dirname, "public"))); //configure mongodb

var _require2 = require('mongodb'),
    MongoClient = _require2.MongoClient;

var _require3 = require("../config.json"),
    password = _require3.password,
    uri = _require3.uri;

var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // mongoDB functions
// Route Definitions

app.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          logger.debug("".concat(req.ip, " sent GET to /}"));
          res.render("ping-project/index", {
            title: "Home"
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/ping", wrap(function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          logger.debug("".concat(req.ip, " sent GET to /ping}"));
          _context2.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          cursor = client.db("ping").collection("ping").find({
            /*all*/
          }).sort({
            _id: -1
          });
          _context2.next = 6;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 6:
          row = _context2.sent;
          console.log(row);
          res.render("ping-project/ping", {
            title: "ping project",
            data: row
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
app.get("/high-ping", wrap(function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(client.connect());

        case 2:
          cursor = client.db("ping").collection("ping").find({
            ping_value: {
              $gt: 500
            }
          });
          _context3.next = 5;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 5:
          row = _context3.sent;
          console.log(row);
          res.render("ping-project/ping-high", {
            title: "High Ping",
            userProfile: {
              data: row
            }
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
app.get("/low-ping", wrap(function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(client.connect());

        case 2:
          cursor = client.db("ping").collection("ping").find({
            ping_value: {
              $lt: 45
            }
          });
          _context4.next = 5;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 5:
          row = _context4.sent;
          console.log(row);
          res.render("ping-project/ping-low", {
            title: "Low Ping",
            userProfile: {
              data: row
            }
          });

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}));
app.get("/development", function (req, res) {
  "";
  res.render("ping-project/development", {
    title: "development",
    data: data
  });
}); // Server Activation

app.listen(port, function () {
  console.log("Listening for requests on http://localhost:".concat(port));
}); // close connection