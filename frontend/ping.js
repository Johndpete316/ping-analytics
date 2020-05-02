const tcpp = require("tcp-ping")
var moment = require('moment-timezone');
const { MongoClient } = require('mongodb');


//configure mongoDB
const { password, uri } = require("../config.json")
const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

var host = '172.217.1.238'
console.log(host)

async function main() {
    console.log('ran main')
    x = 1800
    var time_utc = moment().tz("UTC").format('LTS')
    var date_utc = moment().tz("UTC").format('L')

    var time_est = moment().format('LTS')
    var date_est = moment().format('L')

    var _id = `${date_est}-${time_est}`

    tcpp.ping({ address: host, port: 443 }, async(err, data) => {
        console.log(_id)
        
        var ping = data.avg
        var ping = Math.round(ping * 10 ) / 10
        console.log(ping)

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
            "ping_value": ping
        }
        await client.connect()
        await client.db("ping").collection("ping").insertOne(ping_data).catch( (err) => {
            console.error(err)
        });


    });
    setTimeout(main, x*1000);

}


main()