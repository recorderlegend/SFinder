var tickers = JSON.parse(localStorage.getItem('tickers')) || [];
var lastPrices = {};
var counter = 5

function startUpdateCycle() {
    updatePrices();
    setInterval(function () {
        counter--;
        $('#counter').text(counter);
        if (counter <= 0) {
            updatePrices();
            counter = 5;
        }
    }, 1000)
}

$(document).ready(function () {
    tickers.forEach(function (ticker) {
        addTickerToGrid(ticker);
    });

    updatePrices();

    $('#add-ticker-form').submit(function (e) {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();
        if (!tickers.includes(newTicker)) {
            tickers.push(newTicker)
            localStorage.setItem('tickers', JSON.stringify(tickers))
            addTickerToGrid(newTicker)
        }
        $('#new-ticker').val('');
        updatePrices();
    })
    $('#tickers-grid').on('click', '.remove-btn', function () {
        var tickerToRemove = $(this).data('ticker')
        tickers = tickers.filter(t => t !== tickerToRemove)
        localStorage.setItem('tickers', JSON.stringify(tickers))
        $(`#${tickerToRemove}`).remove()
    })
    startUpdateCycle();
})


function addTickerToGrid(ticker) {
    $('#tickers-grid').append(`<div id="${ticker}" class="stock-box"><h2>${ticker}</h2>
        <p id="${ticker}--price"></p>
        <p id="${ticker}--pct"></p>
        <button class="remove-btn" data-ticker="${ticker}">Remove</button>
        <canvas id="${ticker}--chart" width="400" height="300"></canvas>
        </div>`)

    fetchAndRenderChart(ticker)

}


function updatePrices() {
    tickers.forEach(function (ticker) {
        $.ajax({
            url: '/get_stock_data',
            type: 'POST',
            data: JSON.stringify({ 'ticker': ticker }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var changepercent = ((data.currentPrice - data.openPrice) / data.openPrice) * 100;
                var colorClass;
                if (changepercent <= -2) {
                    colorClass = 'dark-red'
                } else if (changepercent < 0) {
                    colorClass = 'red'
                } else if (changepercent == 0) {
                    colorClass = 'gray'
                } else if (changepercent <= 2) {
                    colorClass = 'green'
                } else {
                    colorClass = 'dark-green'
                }

                $(`#${ticker}--price`).text(`$${data.currentPrice.toFixed(2)}`);
                $(`#${ticker}--pct`).text(`${changepercent.toFixed(2)}`)
                $(`#${ticker}--price`).removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $(`#${ticker}--pct`).removeClass('dark-red red gray green dark-green').addClass(colorClass);

                var flashClass
                if (lastPrices[ticker] > data.currentPrice) {
                    flashClass = 'red-flash'
                } else if (lastPrices[ticker] < data.currentPrice) {
                    flashClass = 'green-flash'
                } else {
                    flashClass = 'gray-flash'
                }

                lastPrices[ticker] = data.currentPrice

                $(`#${ticker}`).addClass(flashClass)
                setTimeout(function () {
                    $(`#${ticker}`).removeClass(flashClass)

                }, 1000)

            }
        })
    })
}

function fetchAndRenderChart(ticker) {
    $.ajax({
        url: '/get_all_time_data',
        type: 'POST',
        data: JSON.stringify({ 'ticker': ticker }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            const labels = data.allTimePrice.map(item => item[0]); // Dates
            const prices = data.allTimePrice.map(item => item[2]); // Closing Prices
            const pctChanges = data.allTimePrice.map(item => item[1]); // Percent Changes

            const ctx = document.getElementById(`${ticker}--chart`).getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${ticker} Stock Price`,
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                        pointRadius: 0,  // Remove the points
                        borderWidth: 2  // Increased border width for visibility
                    }]
                },
                options: {
                    scales: {
                        x: {
                            display: false  // Hide X axis
                        },
                        y: {
                            display: false  // Hide Y axis
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const index = context.dataIndex;
                                    const price = prices[index];
                                    const pct = pctChanges[index];
                                    return `Price: $${price.toFixed(2)}, Change: ${pct.toFixed(2)}%`;
                                },
                                title: function (context) {
                                    return labels[context[0].dataIndex]; // Show the date
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        line: {
                            tension: 0.2  // Smoother lines
                        }
                    }
                }
            });
        }
    });
}
