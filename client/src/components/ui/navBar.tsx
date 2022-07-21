import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { IUserState } from '../../interfaces/IUserState';

import '../../styles/navBar.css';

interface INavBarProps extends IUserState {
    className?: string;
}

const NavBar: React.FC<INavBarProps> = ({ user, className }) => {
    return (
        <nav className={`nav-links ${className}`}>
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/home' state={{ user }}>Home</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/dailydeals' state={{ user }}>Daily Deals</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/trending' state={{ user }}>Trending</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/account' state={{ user }}>Account</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/orders' state={{ user }}>Order Again</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/cart' state={{ user }}>Cart: <span>{user.cart !== undefined ? user.cart.length : "0"}</span></NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to='/contactus' state={{ user }}>Contact Us</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar