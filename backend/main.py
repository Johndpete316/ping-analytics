from tools import parse_output, get_ms, cal_average, get_time_by_timezone, get_data
from database import db_main
from mongodb import insert_data
import time, threading, sqlite3
import signal


wait_seconds = 1800

def main():
    #conn = sqlite3.connect('../ping-analytics.db')
    output = get_data()

    ping = []
    ping = get_ms(output, ping)
    avg_ping = round(cal_average(ping), 1)

    est, mdt, pst = get_time_by_timezone()
    #db_main(est, mdt, pst, avg_ping, conn)
    insert_data(est, mdt, pst, avg_ping)


    #logging
    print(f'Time: {est}')
    print(f'Data: \n {output}')
    print(f'\n\nPing: {avg_ping}')

    
    threading.Timer(wait_seconds, main).start()


main()






