from pymongo import MongoClient
from pprint import pprint
from datetime import datetime


url = "mongodb+srv://the-beast:Homebase3@ping-vzoyq.mongodb.net/test?retryWrites=true&w=majority"


client = MongoClient(url)
db = client.ping


def insert_data(est, mdt, pst, ping_value):
    date = datetime.now()


    ping = {
        "_id": date.strftime("%x::%X-%p"),
        "user": "the-beast",
        "est": est,
        "mdt": mdt,
        "pst": pst,
        "ping_value": ping_value
    }

    db.ping.insert_one(ping)
