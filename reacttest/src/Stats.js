import React, { useState, useEffect } from 'react'
import './Stats.css'
import axios from "axios";


const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = "cqs2gjpr01quefai32p0cqs2gjpr01quefai32pg"
function Stats() {

    const [stockData, setstockData] = useState([])

    const getStockData = (stock) => {
        return axios
            .get(`${BASE_URL}?symbol=${stock}&token${KEY_URL}`)
            .catch((error) => {
                console.error("Error", error.message);
            });


    }


    useEffect((stock) => {
        return axios
            .get(`${BASE_URL}${stock}${KEY_URL}`)
            .catch((error) => {
                console.error("Error", error.message);
            });
    }, [])




    return (
        <div className='stats'>
            <div className='stats__container'>
                <div className='stats__header'>
                    <p>Stocks</p>

                </div>
                <div className='stats__content'>
                    <div className='stats__rows'>
                    </div>
                </div>


                <div className='stats__header'>
                    <p>Lists</p>
                </div>


            </div>

        </div>
    )
}

export default Stats
