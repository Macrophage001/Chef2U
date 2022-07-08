import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { tryCatch } from '../helper/util';

import '../styles/introScreen.css';
import MainScreen from './mainScreen';
import AuthenticationScreen from './authenticationScreen';

const IntroScreen = ({ navLinks }) => {
    const [user, setUser] = useState(undefined);
    const [component, setComponent] = useState(<></>);
    const [className, setClassName] = useState('');

    useEffect(() => {
        tryCatch(async () => {
            const response = await axios.get('/api/auth/login');
            console.log("Found user in session: ", response.data);
            if (response.data) {
                console.log("Found session token: ", response.data.user);
                setUser(response.data);
            }
        })();
    }, []);

    const unlockWebPage = () => {
        if (user) {
            setComponent(<MainScreen user={user} navLinks={navLinks} />);
        } else {
            setComponent(<AuthenticationScreen />);
        }
        setClassName('unlocked');
    }

    return (
        <div>
            <div className={`intro-screen ${className}`}>
                <h1>Chef2U</h1>
                <h2>Bringing <span>restaurant quality</span> food to <span>you</span>.</h2>
                <div onClick={unlockWebPage} className="unlock-button">
                    <img src="\images\down-arrow.png" alt="down_arrow" />
                </div>
            </div>
            {component}
        </div>
    )
}

export default IntroScreen