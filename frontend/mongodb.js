const {MongoClient} = require('mongodb');
const { password, uri } = require("../config.json")


async function setupDB() {

    


    try {

        await client.connect();
        //await findOneListingByName(client, 500)
        //await findHighestPing(client)
        //await findAll(client)
        return client

    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }

    
}

async function findHighestPing(client) {
    

    const result = await cursor.toArray()
    if (result) {
        console.log(result)
    } else {
        console.log("no value found")
    }
}


async function findAll(client) {
    cursor = await client.db("ping").collection('ping').find({})

    const result = await cursor.toArray()
    console.log(result)
}



exports.setupDB = setupDB
exports.findHighestPing = findHighestPing

