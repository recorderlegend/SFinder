import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Linegraph.css'
import 'chartjs-adapter-moment';

Chart.register(...registerables);

function Linegraph() {
    const [graphData, setGraphData] = useState([])
    // const data = [
    //     { x: 10, y: 20 },
    //     { x: 12, y: 4 },
    //     { x: 15, y: 10 }

    // ];

    const createMockData = () => {
        let data = [];
        let value = 50;
        for (var i = 0; i < 366; i++) {
            let date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(i);
            value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
            data.push({ x: date, y: value })
        }
        setGraphData(data);
    }
    useEffect(() => {
        createMockData();


    }, [])

    return (
        <div className='linegraph'>
            <Line

                data={{
                    datasets: [
                        {
                            type: 'line',
                            backgroundColor: "black",
                            borderColor: "#5AC53B",
                            borderWidth: 2.2,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                            pointHoverBackgroundColor: '#5AC53B',
                            pointHoverBorderColor: '#000000',
                            pointHoverBorderWidth: 10,
                            pointHoverRadius: 10,
                            data: graphData, // x and y values here
                        }
                    ]
                }}
                options={{
                    borderWidth: 0,
                    borderJoinStyle: 'round',
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: "index",
                            intersect: "false",
                            callbacks: {
                                title: (tooltipItems) => {
                                    const date = tooltipItems[0].raw.x;
                                    return new Date(date).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric'
                                    }); // Format the date as needed
                                },
                            }
                        }
                    }
                    ,
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "month"
                            },
                            display: false,
                        },
                        y: {
                            display: false,
                            beginAtZero: true,
                        }
                    },
                }}
            />
        </div>
    );
}

export default Linegraph;