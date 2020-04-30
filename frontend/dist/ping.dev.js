"use strict";

var tcpp = require("tcp-ping");

var moment = require('moment-timezone');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient; //configure mongoDB


var _require2 = require("../config.json"),
    password = _require2.password,
    uri = _require2.uri;

var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var host = '51.161.117.73';

function main() {
  var time_utc, date_utc, time_est, date_est, _id;

  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          x = 5;
          time_utc = moment().tz("UTC").format('LTS');
          date_utc = moment().tz("UTC").format('L');
          time_est = moment().format('LTS');
          date_est = moment().format('L');
          _id = "".concat(date_est, " ").concat(time_est);
          tcpp.ping({
            address: host,
            port: 25677
          }, function _callee(err, data) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log(_id);
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
                    _context.next = 4;
                    return regeneratorRuntime.awrap(client.connect());

                  case 4:
                    _context.next = 6;
                    return regeneratorRuntime.awrap(client.db("data").collection("ping-data").insertOne(ping_data)["catch"](function (err) {
                      console.error(err);
                    }));

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          setTimeout(main, x * 1000);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

main();