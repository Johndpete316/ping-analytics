const tcpp = require("tcp-ping")
var moment = require('moment-timezone');
const { MongoClient } = require('mongodb');


//configure mongoDB
const { password, uri } = require("../config.json")
const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

var host = '51.161.117.73'

async function main() {
    x = 5
    var time_utc = moment().tz("UTC").format('LTS')
    var date_utc = moment().tz("UTC").format('L')

    var time_est = moment().format('LTS')
    var date_est = moment().format('L')

    var _id = `${date_est} ${time_est}`

    tcpp.ping({ address: host, port: 25677 }, async(err, data) => {
        console.log(_id)

        

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
        }
        await client.connect()
        await client.db("data").collection("ping-data").insertOne(ping_data).catch( (err) => {
            console.error(err)
        });


    });
    setTimeout(main, x*1000);

}


main()