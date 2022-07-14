import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';

import '../../styles/logInScreen.css';
import '../../styles/button.css';

import { tryCatch } from '../../helper/util';

import Button from '../ui/button';
import LogInForm from '../authentication/logIn';
import SignUpForm from '../authentication/signUp';

import { tryAddToStorage } from '../../helper/storageHelper';

const AuthenticationScreen = () => {
    axios.defaults.withCredentials = true;
    const [authType, setAuthType] = useState('log-in');
    const navigate = useNavigate();

    const storeAuthToken = (response) => {
        console.log(response.data);
        tryAddToStorage('session', 'user', { ...response.data, avatar: { data: null, contentType: '' } });
        if (response.data.avatar.data) {
            const decodedAvatar = { ...response.data.avatar, data: Buffer.from(response.data.avatar.data, 'base64').toString('base64') };
            tryAddToStorage('session', 'user.avatar', { ...response.data, avatar: decodedAvatar });
        }

        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
        localStorage.setItem('user', JSON.stringify({ ...response.data, avatar: { data: null, contentType: '' } }));
        if (response.data.avatar.data) {
            const decodedAvatar = { ...response.data.avatar, data: Buffer.from(response.data.avatar.data, 'base64').toString('base64') };
            // console.log("Rough Byte Count of Decoded Avatar: ", 4 * decodedAvatar.data.length);
            localStorage.setItem('user.avatar', JSON.stringify(decodedAvatar));
        }
    }

    const authTypeMap = {
        'log-in': () => {
            tryCatch(async () => {
                const response = await axios.post('/api/auth/login', credentials);
                storeAuthToken(response);
                navigate('/Home', { state: { user: response.data } });
            })();
        },
        'sign-up': () => {
            tryCatch(async () => {
                const response = await axios.post('/api/auth/signup', credentials);
                storeAuthToken(response);
                navigate('/Home', { state: { user: response.data } });
            })();
        }
    }

    const [credentials, setCredentials] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        customerType: '',
        avatar: {
            data: '',
            contentType: ''
        }
    });

    const handleChange = (e) => {
        const newCredentials = credentials;
        newCredentials[e.target.name] = e.target.value;
        setCredentials(newCredentials);
    }

    const authTypeFormMap = {
        'log-in': <LogInForm handleSubmit={authTypeMap[authType]} handleChange={handleChange} />,
        'sign-up': <SignUpForm handleSubmit={authTypeMap[authType]} handleChange={handleChange} />
    }

    return (
        <div className="log-in-screen">
            <div className='log-in-screen-header' />
            <div className='log-in-screen-body'>
                <div className='log-in-screen-body-authentication'>
                    {authType === 'log-in' ? <h1>Log In</h1> : <h1>Sign Up</h1>}
                    {authTypeFormMap[authType]}
                    <div className='authentication-buttons'>
                        <Button label="Sign Up" onClick={() => authType === 'sign-up' ? authTypeMap[authType]() : setAuthType('sign-up')} />
                        <Button label="Log In" onClick={() => authType === 'log-in' ? authTypeMap[authType]() : setAuthType('log-in')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationScreen;
