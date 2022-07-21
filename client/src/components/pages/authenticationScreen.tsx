import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

import '../../styles/logInScreen.css';
import '../../styles/button.css';

import { encryptPassword, tryCatch } from '../../helper/util';

import Button from '../ui/button';
import LogInForm from '../authentication/logIn';
import SignUpForm from '../authentication/signUp';

import { tryAddToStorage, tryGetFromStorage } from '../../helper/storageHelper';
import { ICredentials } from '../../interfaces/IUser';

interface ICustomSyntheticEvent extends BaseSyntheticEvent {
    target: {
        name: string;
        value: any;
    };
}

enum AuthenticationState {
    LogIn,
    SignUp,
}

const AuthenticationScreen = () => {
    axios.defaults.withCredentials = true;
    const [authenticationState, setAuthenticationState] = useState(AuthenticationState.LogIn);

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

    const navigate = useNavigate();
    const storeAuthToken = (response: AxiosResponse) => {
        const sanitizedUser = { ...response.data, avatar: { data: '', contentType: '' } };
        tryAddToStorage('session', 'user', sanitizedUser);
        if (response.data.avatar.data) {
            const decodedAvatar = { ...response.data.avatar, data: Buffer.from(response.data.avatar.data, 'base64').toString('base64') };
            tryAddToStorage('session', 'user.avatar', { ...response.data, avatar: decodedAvatar });
        }
    }

    const authTypeMap = {
        [AuthenticationState.LogIn]: () => {
            tryCatch(async () => {
                console.log()

                const response = await axios.post('/api/auth/login', credentials);
                storeAuthToken(response);
                navigate('/Home', { state: { user: response.data } });
            })();
        },
        [AuthenticationState.SignUp]: () => {
            tryCatch(async () => {
                const response = await axios.post('/api/auth/signup', credentials);
                storeAuthToken(response);
                navigate('/Home', { state: { user: response.data } });
            })();
        }
    }

    /**
     * TODO: Find a better way to do this.
     * @description: This is a hack to be able to index the credentials.
     * @param e The event that triggered the function
     */
    const handleChange = (e: ICustomSyntheticEvent) => {
        const newCredentials = { ...credentials };
        const { name, value } = e.target;

        newCredentials[name as keyof ICredentials] = value;
        setCredentials(newCredentials);
    }

    const authTypeFormMap = {
        [AuthenticationState.LogIn]: <LogInForm credentials={credentials} handleOnSubmit={authTypeMap[authenticationState]} handleOnChange={handleChange} />,
        [AuthenticationState.SignUp]: <SignUpForm credentials={credentials} handleOnSubmit={authTypeMap[authenticationState]} handleOnChange={handleChange} />
    }

    // const [authComponent, setAuthComponent] = useState(<LogInForm credentials={credentials} handleOnSubmit={authTypeMap[authenticationState]} handleOnChange={handleChange} />);

    // useEffect(() => {
    //     setAuthComponent(authTypeFormMap[authenticationState]);
    // }, [authenticationState]);

    return (
        <div className="log-in-screen">
            <div className='log-in-screen-header' />
            <div className='log-in-screen-body'>
                <div className='log-in-screen-body-authentication'>
                    {authenticationState === AuthenticationState.LogIn ? <h1>Log In</h1> : <h1>Sign Up</h1>}
                    {/* {authComponent} */}
                    {
                        authenticationState === AuthenticationState.LogIn
                            ? <LogInForm credentials={credentials} handleOnSubmit={authTypeMap[authenticationState]} handleOnChange={handleChange} />
                            : <SignUpForm credentials={credentials} handleOnSubmit={authTypeMap[authenticationState]} handleOnChange={handleChange} />
                    }

                    <div className='authentication-buttons'>
                        <Button onClick={() => authenticationState === AuthenticationState.SignUp ? authTypeMap[authenticationState]() : setAuthenticationState(AuthenticationState.SignUp)}>
                            <p>Sign Up</p>
                        </Button>
                        <Button onClick={() => authenticationState === AuthenticationState.LogIn ? authTypeMap[authenticationState]() : setAuthenticationState(AuthenticationState.LogIn)}>
                            <p>Log In</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationScreen;
