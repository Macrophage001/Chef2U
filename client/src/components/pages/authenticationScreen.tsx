import React, { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

import '../../styles/logInScreen.css';
import '../../styles/button.css';

import { encryptPassword, tryCatch } from '../../helper/util';

import Button from '../ui/button';
import LogInForm from '../authentication/logIn';
import SignUpForm from '../authentication/signUp';

import { tryAddToStorage } from '../../helper/storageHelper';
import { ICredentials } from '../../interfaces/IUser';

interface ICustomSyntheticEvent extends BaseSyntheticEvent {
    target: {
        name: string,
        value: any
    }
}

const AuthenticationScreen = () => {
    axios.defaults.withCredentials = true;
    const [authType, setAuthType] = useState('log-in' as keyof (typeof authTypeFormMap | typeof authTypeMap));
    const navigate = useNavigate();

    const storeAuthToken = (response: AxiosResponse) => {
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
    } as ICredentials);

    const handleChange = (e: ICustomSyntheticEvent) => {
        const newCredentials = credentials;
        const { name, value } = e.target;
        newCredentials[name as keyof ICredentials] = value;
        setCredentials(newCredentials);
    }

    const authTypeFormMap = {
        'log-in': <LogInForm credentials={credentials} handleOnSubmit={authTypeMap[authType]} handleOnChange={handleChange} />,
        'sign-up': <SignUpForm credentials={credentials} handleOnSubmit={authTypeMap[authType]} handleOnChange={handleChange} />
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
