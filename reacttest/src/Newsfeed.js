import React from 'react'
import './Newsfeed.css'
import Linegraph from './Linegraph'



function Newsfeed() {
    return (
        <div className='newsfeed'>
            <div className='newsfeed__container'>
                <div className='newsfeed__chartSection'>
                    <div className='newsfeed__portfolio'>
                        <h1>$133,654</h1>
                        <p>+44.63 (+0.04%) Today</p>

                    </div>
                </div>

                <div className='newsfeed__chart'>
                    <Linegraph />
                </div>




            </div>
        </div >
    )
}

export default Newsfeed
