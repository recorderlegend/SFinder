import React, { useState } from 'react'
import Logo from './robinhood.svg'
import LogoHover from './robinhood-2.svg'
import './Header.css'
import SearchOutlined from "@material-ui/icons/SearchOutlined";


function Header() {

    const [logoSrc, setLogoSrc] = useState(Logo);
    const [searchTerm, setSearchTerm] = useState('');

    const handleMouseEnter = () => {
        setLogoSrc(LogoHover);
    };

    const handleMouseLeave = () => {
        setLogoSrc(Logo);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            // event.preventDefault();
            console.log('Search term:', searchTerm);
        }
    };

    return (
        <div className="header__wrapper">
            {/* logo */}
            <div className="header__logo">
                <img src={logoSrc} width={25} onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}></img>
            </div>
            {/* search */}
            <div className='header__search'>
                <div className='header__searchContainer'>
                    <div className='search__icon'><SearchOutlined /></div>
                    <input placeholder="Search" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}></input>
                </div>

            </div>
            {/* menuitems */}
            <div className='header__wrapper' >
                <div className='header__menuItems'>
                    <a href="#">Rewards</a>
                    <a href="#">Investing</a>
                    <a href="#">Crypto</a>
                    <a href="#">Spending</a>
                    <a href="#">Retirement</a>
                    <a href="#">Notifications</a>
                    <a href="#">Account</a>
                </div>
            </div>

        </div >
    )
}

export default Header
