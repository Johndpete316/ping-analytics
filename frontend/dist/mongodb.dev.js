"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var _require2 = require("../config.json"),
    password = _require2.password,
    uri = _require2.uri;

function setupDB() {
  return regeneratorRuntime.async(function setupDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          return _context.abrupt("return", client);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 9:
          _context.prev = 9;
          _context.next = 12;
          return regeneratorRuntime.awrap(client.close());

        case 12:
          return _context.finish(9);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6, 9, 13]]);
}

function findHighestPing(client) {
  var result;
  return regeneratorRuntime.async(function findHighestPing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 2:
          result = _context2.sent;

          if (result) {
            console.log(result);
          } else {
            console.log("no value found");
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function findAll(client) {
  var result;
  return regeneratorRuntime.async(function findAll$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(client.db("ping").collection('ping').find({}));

        case 2:
          cursor = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 5:
          result = _context3.sent;
          console.log(result);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}

exports.setupDB = setupDB;
exports.findHighestPing = findHighestPing;