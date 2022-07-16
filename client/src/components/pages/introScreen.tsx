import React, { useState, useEffect } from 'react'
import axios from 'axios';

import MainScreen from './mainScreen';
import AuthenticationScreen from './authenticationScreen';

import { tryCatch } from '../../helper/util';

import '../../styles/introScreen.css';
import { IUser } from '../../interfaces/IUser';

interface IntroScreenProps {
    onAnimationEnd: (e: any) => void;
    navLinks: any;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onAnimationEnd, navLinks }) => {
    const [user, setUser] = useState({} as IUser);
    const [component, setComponent] = useState(<></>);
    const [className, setClassName] = useState('');

    useEffect(() => {
        tryCatch(async () => {
            const response = await axios.get('/api/auth/login');
            if (response.data) {
                setUser(response.data);
            }
        })();
    }, []);

    const unlockWebPage = () => {
        if (user) {
            setComponent(<MainScreen navLinks={navLinks} />);
        } else {
            setComponent(<AuthenticationScreen />);
        }
        setClassName('unlocked');
    }

    return (
        <div>
            <div className={`intro-screen ${className}`} onAnimationEnd={onAnimationEnd}>
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