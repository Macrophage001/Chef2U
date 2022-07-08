import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/navBar.css';

const NavBar = ({ className, user }) => {
    return (
        <nav className={`nav-links ${className}`}>
            <ul>
                <li><Link to='/home' state={{ user }}>Home</Link></li>
                <li><Link to='/dailydeals' state={{ user }}>Daily Deals</Link></li>
                <li><Link to='/trending' state={{ user }}>Trending</Link></li>
                <li><Link to='/account' state={{ user }}>Account</Link></li>
                <li><Link to='/account/orders' state={{ user }}>Order Again</Link></li>
                <li><Link to='/account/cart' state={{ user }}>Cart: <span>{user.cart !== undefined ? user.cart.length : "0"}</span></Link></li>
                <li><Link to='/contactus' state={{ user }}>Contact Us</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar