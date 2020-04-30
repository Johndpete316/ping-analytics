"use strict";

var tcpp = require("tcp-ping");

var moment = require('moment-timezone');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient; //date


var time_utc = moment().tz("UTC").format('LTS');
var date_utc = moment().tz("UTC").format('L');
var time_est = moment().format('LTS');
var date_est = moment().format('L');

var _id = "".concat(date_est, " ").concat(time_est);

console.log(_id); //configure mongoDB

var _require2 = require("../config.json"),
    password = _require2.password,
    uri = _require2.uri;

var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var host = '51.161.117.73';
tcpp.ping({
  address: host,
  port: 25677
}, function _callee(err, data) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ping_data = {
            "_id": _id,
            "day": moment().format('ddd'),
            "hour": moment().format('hh'),
            "device": "the-beast",
            "date_est": date_est,
            "time_est": time_est,
            "date_utc": date_utc,
            "time_utc": time_utc,
            "ip": data.address,
            "ping_avg": data.avg,
            "ping_max": data.max,
            "ping_min": data.min
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(client.db("data").collection("ping-data").insertOne(ping_data));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(client.close());

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});