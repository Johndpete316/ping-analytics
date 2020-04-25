from pymongo import MongoClient
from pprint import pprint
from datetime import datetime
date = datetime.now()


url = "mongodb+srv://johndpete316:Homebase1@ping-vzoyq.mongodb.net/test?retryWrites=true&w=majority"


client = MongoClient(url)
db = client.ping


def insert_data(est, mdt, pst, ping_value):
    ping = {
        "_id": date.strftime("%x::%X-%p"),
        "est": est,
        "mdt": mdt,
        "pst": pst,
        "ping_value": ping_value
    }

    db.ping.insert_one(ping)
