import React, { useState } from 'react'
import './TimeLine.css';


function TimeLine() {

    const labels = ['1D', '1W', '1M', '3M', 'YTD', '1Y', 'ALL']
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(index); // Update activeIndex with the clicked button's index
    };


    return (
        <div className="timeline__container">
            <div className="timeline__buttons__container">
                {labels.map((label, index) =>
                    <div className={index == activeIndex ? "timeline__button active" : "timeline__button"}
                        key={index} onClick={() => handleClick(index)}>{label}</div>
                )}
            </div>
        </div>
    )
}

export default TimeLine