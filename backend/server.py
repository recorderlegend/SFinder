import yfinance as yf
from flask import request,render_template,jsonify,Flask
from datetime import datetime


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


# THIS HAS TO BE A POST METHOD
@app.route('/get_stock_data')
def get_stock_data():
    # ticker = request.get_json()['ticker']
    ticker = 'MSFT'
    data = yf.Ticker(ticker).history(period='1y')
    return {'currentPrice':data.iloc[-1].Close,
                   'openPrice':data.iloc[-1].Open}

@app.route('/get_portfolio_value')
def get_portfolio_value():
    return {'value':f'${972.68}'}


# @app.route('/get_all_time_data', methods=['POST'])
# def get_all_time_data():
#     ticker = request.get_json()['ticker']


#     data = yf.Ticker(ticker).history(period='max') 

#     monthly_data = data.resample('M').ffill()

#     all_time_data_per_day = []
    
#     for date, row in data.iterrows():
#         pct = 100 * (row['Close']-row['Open'])/row['Open']
#         all_time_data_per_day.append((date.strftime('%b %d, %Y').upper(),pct, row['Close'].round(2)))
    
#     return jsonify({
#         'allTimePrice': all_time_data_per_day
#     })


# @app.route('/stock.html')
# def stock():
#     return render_template('stock.html')

# if __name__ == '__main__':
#     app.run(debug=True)





    

