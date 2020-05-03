"use strict";

// Required External Modules
var express = require("express");

var path = require("path");

var wrap = require('./wraper'); // App Variables


var app = express();
var port = process.env.PORT || "8000"; // App configuration

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express["static"](path.join(__dirname, "public"))); //configure mongodb

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var _require2 = require("../config.json"),
    password = _require2.password,
    uri = _require2.uri;

var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // Route Definitions

app.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("ping-project/index", {
            title: "Home"
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/ping", wrap(function _callee2(req, res, next) {
  var j, id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(client.connect());

        case 2:
          cursor = client.db("ping").collection("ping").find({
            /*all*/
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 5:
          row = _context2.sent;
          ping_value = {
            length: 0
          };

          for (j = 0; j < row.length; j++) {
            id = row[j]._id;
            id = id.substring(0, 8);
            n = String(j);
            ping_value['length'] = j;
            ping_value[n] = row[n].ping_value + ', ' + row[n].time_est + ', ' + id;
          }

          res.render("ping-project/ping", {
            title: "ping project",
            data: row,
            ping_value: ping_value
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
});