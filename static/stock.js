"use strict";

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const ticker = urlParams.get('ticker');
    
    document.title = `${ticker} - SFinder`;

    const div = $('.graph') 
    div.append(`<canvas id="${ticker}--chart" ></canvas>`);
    
    if (ticker) {
        fetchAndRenderChart(ticker);
    }
});


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
