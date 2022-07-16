import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom';
import { IUser } from '../interfaces/IUser';

import '../styles/navBar.css';

interface NavBarProps {
    user: IUser;
    className: string;
    setUser: Dispatch<SetStateAction<{}>>;
}

const NavBar: React.FC<NavBarProps> = ({ user, setUser, className }) => {
    return (
        <nav className={`nav-links ${className}`}>
            <ul>
                <li><Link to='/home' state={{ user }}>Home</Link></li>
                <li><Link to='/dailydeals' state={{ user }}>Daily Deals</Link></li>
                <li><Link to='/trending' state={{ user }}>Trending</Link></li>
                <li><Link to='/account' state={{ user, setUser }}>Account</Link></li>
                <li><Link to='/account/orders' state={{ user, setUser }}>Order Again</Link></li>
                <li><Link to='/account/cart' state={{ user, setUser }}>Cart: <span>{user.cart !== undefined ? user.cart.length : "0"}</span></Link></li>
                <li><Link to='/contactus' state={{ user }}>Contact Us</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar