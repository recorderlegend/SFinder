import React, { useState, useEffect } from 'react'
import './Stats.css'
import axios from "axios";
import StatsRow from './StatsRow';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = "&token=cqs2gjpr01quefai32p0cqs2gjpr01quefai32pg"
function Stats() {

    const [stockData, setStockData] = useState([]);
    const [myStocks, setMyStocks] = useState([]);

    const getMyStocks = () => {
        const myStocksCollection = collection(db, 'myStocks');

        onSnapshot(myStocksCollection, (snapshot) => {
            let promises = [];
            let tempData = [];
            snapshot.docs.map((doc) => {
                promises.push(
                    getStocksData(doc.data().ticker)
                        .then(res => {
                            tempData.push({
                                id: doc.id,
                                data: doc.data(),
                                info: res.data
                            })
                        })
                )
            });
            Promise.all(promises).then(() => {
                setMyStocks(tempData);
            });
        });
    }

    const getStocksData = (stock) => {
        return axios
            .get(`${BASE_URL}${stock}${KEY_URL}`)
            .catch((error) => {
                console.error("Error", error.message);
            });
    }

    useEffect((stock) => {
        let tempStocksData = []
        const stocksList = ["AAPL", "MSFT", "TSLA", "META", "BABA", "UBER", "DIS", "SBUX", "AMD"];

        let promises = [];
        getMyStocks();
        stocksList.map((stock) => {
            promises.push(
                getStocksData(stock)
                    .then((res) => {
                        tempStocksData.push({
                            name: stock,
                            ...res.data
                        });
                    })
            )
        });

        Promise.all(promises).then(() => {
            setStockData(tempStocksData);
        });
    }, []);




    return (
        <div className='stats'>
            <div className='stats__container'>
                <div className='stats__header'>
                    <p>Stocks</p>

                </div>
                <div className='stats__content'>
                    <div className='stats__rows'>
                        {myStocks.map((stock) => (
                            <StatsRow
                                key={stock.data.ticker}
                                name={stock.data.ticker}
                                openPrice={stock.info.o}
                                volume={stock.data.shares}
                                price={stock.info.c}
                            />
                        ))}
                    </div>
                </div>


                <div className='stats__header stats__lists'>
                    <p>Lists</p>
                </div>
                <div className='stats__content'>
                    {stockData.map((stock) => (
                        <StatsRow
                            key={stock.name}
                            name={stock.name}
                            openPrice={stock.o}
                            price={stock.c}
                        />
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Stats
