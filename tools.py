import re
import os
from datetime import datetime
import pytz

def get_data():
    stream = os.popen("ping -c 3 51.161.117.73")
    output = stream.read()
    output = output.split(' ')
    output = parse_output(output)
    return output


def parse_output(output):
    
    for x in range(6):
        for i in output:
            if "time" not in i:
                output.remove(i)

    
    output.remove("time")

    return output


def get_ms(output, ping):
    for i in output:
        ms = float(re.search(r'\d+', i).group())
        ping.append(ms)

    return ping


def cal_average(ping):
    try:
        sum_num = 0
        for t in ping:
            sum_num = sum_num + t           

        avg = sum_num / len(ping)
        return avg
    except:
        return ping[1]


def get_time_by_timezone():
    tz_EST = pytz.timezone('US/Eastern')
    dt_EST = datetime.now(tz_EST)
    est = dt_EST.strftime('%-I:%M:%S %p')

    tz_MDT = pytz.timezone('US/Mountain')
    dt_MDT = datetime.now(tz_MDT)
    mdt = dt_MDT.strftime('%-I:%M:%S %p')

    tz_PST = pytz.timezone('US/Pacific')
    dt_PST = datetime.now(tz_PST)
    pst = dt_PST.strftime('%-I:%M:%S %p')

    return str(est), str(mdt), str(pst)
