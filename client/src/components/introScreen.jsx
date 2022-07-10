import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { tryCatch } from '../helper/util';

import '../styles/introScreen.css';
import MainScreen from './mainScreen';
import AuthenticationScreen from './authenticationScreen';

const IntroScreen = ({ setRoute, navLinks, className, onAnimationEnd }) => {
    const [user, setUser] = useState(undefined);
    const [component, setComponent] = useState(<></>);
    // const [className, setClassName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        tryCatch(async () => {
            const response = await axios.get('/api/auth/login');
            if (response.data) {
                setUser(response.data);
            }
        })();
    }, []);

    const unlockWebPage = () => {
        // if (user) {
        //     setComponent(<MainScreen user={user} navLinks={navLinks} />);
        // } else {
        //     setComponent(<AuthenticationScreen />);
        // }
        // setClassName('unlocked');
    }

    return (
        <div>
            <div className={`intro-screen ${className}`} onAnimationEnd={onAnimationEnd}>
                <h1>Chef2U</h1>
                <h2>Bringing <span>restaurant quality</span> food to <span>you</span>.</h2>
                <Link to={user ? '/home' : '/login'} state={{ user }}>
                    <img src="\images\down-arrow.png" alt="down_arrow" />
                </Link>
            </div>
            {component}
        </div>
    )
}

export default IntroScreen