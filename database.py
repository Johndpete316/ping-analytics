import sqlite3

def db_main(est, mdt, pt, ping_value, conn):    
    c = conn.cursor()
    init_db(c)
    c.execute("INSERT INTO ping(est, mdt, pst, ping_value) VALUES (?, ?, ?, ?)", (est, mdt, pt, ping_value))
    conn.commit()
    conn.close()


def init_db(c):
    c.execute("CREATE TABLE IF NOT EXISTS ping(est TEXT, mdt TEXT, pt TEXT, ping_value REAL)")

