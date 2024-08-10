import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential # type: ignore
from keras.layers import LSTM, Dense # type: ignore


stock_symbol = 'AAPL'
start_date = '2024-1-1'
end_date = '2024-6-1'
data = yf.download(stock_symbol, start=start_date, end=end_date)


close_prices = data['Close'].values.reshape(-1, 1)
scaler = MinMaxScaler(feature_range=(0, 1))
close_prices_scaled = scaler.fit_transform(close_prices)


def create_lstm_data(data, time_steps=1):
    x, y = [], []
    for i in range(len(data) - time_steps):
        x.append(data[i:(i + time_steps), 0])
        y.append(data[i + time_steps, 0])
    return np.array(x), np.array(y)


time_steps = 10
x, y = create_lstm_data(close_prices_scaled, time_steps)
x = np.reshape(x, (x.shape[0], x.shape[1], 1))

model = Sequential()
model.add(LSTM(units=50, return_sequences=True, input_shape=(x.shape[1], 1)))
model.add(LSTM(units=50))
model.add(Dense(units=1))
model.compile(optimizer='adam', loss='mean_squared_error')  

model.fit(x, y, epochs=50, batch_size=2048)

future_dates = pd.date_range(start=end_date, periods=30)
last_prices = close_prices[-time_steps:]
last_prices_scaled = scaler.transform(last_prices.reshape(-1, 1))
x_pred = np.array([last_prices_scaled[-time_steps:, 0]])
x_pred = np.reshape(x_pred, (x_pred.shape[0], x_pred.shape[1], 1))
predicted_prices_scaled = model.predict(x_pred)
predicted_prices = scaler.inverse_transform(predicted_prices_scaled)

future_dates = pd.date_range(start=end_date, periods=30)
predicted_prices = []

for _ in range(len(future_dates)):
    x_pred = np.array([last_prices_scaled[-time_steps:, 0]])
    x_pred = np.reshape(x_pred, (x_pred.shape[0], x_pred.shape[1], 1))
    
    predicted_price_scaled = model.predict(x_pred)
    predicted_price = scaler.inverse_transform(predicted_price_scaled)

    predicted_prices.append(predicted_price[0, 0])

    last_prices_scaled = np.append(last_prices_scaled, predicted_price_scaled, axis=0)
    last_prices_scaled = last_prices_scaled[1:]

predicted_prices = np.array(predicted_prices)
future_data = pd.DataFrame({'Date': future_dates, 'Predicted Price': predicted_prices})

print(future_data)
