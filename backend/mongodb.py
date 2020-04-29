from pymongo import MongoClient
from pprint import pprint
from datetime import datetime


url = "mongodb+srv://the-beast:Homebase3@ping-vzoyq.mongodb.net/test?retryWrites=true&w=majority"


client = MongoClient(url)
db = client.ping


def insert_data(est, mdt, pst, avg_ping, ip):
    date = datetime.now()


    ping = {
        "_id": date.strftime("%x::%X-%p"),
        "day": date.strftime("%a"),
        "hour": date.strftime("%I"),
        "a/p": date.strftime("%p"),
        "user": "the-beast",
        "est": est,
        "mdt": mdt,
        "pst": pst,
        "ip": ip,
        "ping_value": avg_ping
    }

    db.ping.insert_one(ping)
