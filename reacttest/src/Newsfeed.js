import React, { useState, useEffect } from 'react'
import './Newsfeed.css'
import Linegraph from './Linegraph'
import TimeLine from './TimeLine'
import Chip from '@material-ui/core/Chip'
import { Avatar } from '@material-ui/core'



function Newsfeed() {
    const [popularTopics, setTopics] = useState([
        "Technology",
        "Top Movies",
        "Upcoming Earnings",
        "Crypto",
        "Cannabis",
        "Healthcare Supplies",
        "Index ETFs",
        "Technology",
        "China",
        "Pharma",
    ]);




    return (
        <div className="newsfeed">
            <div className="newsfeed__container">
                <div className="newsfeed__chart__section">
                    <div className="newsfeed_price_asset">
                        <h1>Investing</h1>
                        <h1> $113,656</h1>
                        <p> $142.90 (+0.12) Today </p>
                    </div>
                    <div className="newsfeed__chart">
                        <Linegraph />
                        <TimeLine />
                    </div>
                </div>
                <div className="newsfeed__buying__section">
                    <h2> Buying Power</h2>
                    <h2> $4.11</h2>
                </div>
                <div className="newsfeed__market__section">
                    <div className="newsfeed__market__box">
                        <p> Markets Closed</p>
                        <h1> Happy Thanksgiving</h1>
                    </div>
                </div>
                <div className="newsfeed__popularlists__section">
                    <div className="newsfeed__popularlists__intro">
                        <h1>Popular lists</h1>
                        <p>Show More</p>
                    </div>
                    <div className="newsfeed_popularlists_badges">
                        {popularTopics.map((topic) => (
                            <Chip
                                className="topic__badge"
                                variant="outlined"
                                label={topic}
                                avatar={<Avatar
                                    src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                                />}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Newsfeed;