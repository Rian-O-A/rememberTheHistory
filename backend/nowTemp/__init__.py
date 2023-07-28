import pytz
from datetime import datetime


def nowTemp():
    timezone = pytz.timezone('America/Sao_Paulo')
    current_time = datetime.now(timezone)
    
    return current_time.strftime('%Y-%m-%d %H:%M:%S %Z%z')

