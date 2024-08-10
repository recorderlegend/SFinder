import yfinance as yf
from datetime import datetime

start_date = "2000-1-1"

end_date = datetime.today().strftime('%Y-%m-%d')


NVDA = yf.Ticker("NVDA")

data = NVDA.history(start=start_date,end=end_date)

for date,row in data.iterrows():
    # print((date.strftime('%b %d,%Y').upper(), row['Close'].round(2)))
    pct = 100 * (row['Close']-row['Open'])/row['Open']
    print(pct)
