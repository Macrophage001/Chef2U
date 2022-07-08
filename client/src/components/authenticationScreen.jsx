import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/logInScreen.css';
import '../styles/button.css';

import { tryCatch } from '../helper/util';

import Button from './button';

const LogInForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" name='userName' placeholder='Username...' value={props.userName} onChange={props.handleChange} />
        <input type="password" name='password' placeholder='Password...' value={props.password} onChange={props.handleChange} />
        <input type="submit" value="Submit" style={{ display: 'none' }} />
    </form>
)

const SignUpForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" name='firstName' placeholder='First Name...' value={props.name} onChange={props.handleChange} />
        <input type="text" name='lastName' placeholder='Last Name...' value={props.name} onChange={props.handleChange} />
        <input type="text" name='userName' placeholder='User Name...' value={props.name} onChange={props.handleChange} />
        <input type="text" name='email' placeholder='Email...' value={props.email} onChange={props.handleChange} />
        <input type="password" name='password' placeholder='Password...' value={props.password} onChange={props.handleChange} />
        <input type="password" name='passwordConfirmation' placeholder='Confirm Password...' value={props.passwordConfirmation} onChange={props.handleChange} />

        <h2>Are you a:</h2>
        <div className="form-customer-type">
            <div className="type">
                <img src="/images/chef.png" alt="chef_image" />
                <input type="radio" required={true} name='customerType' value="Chef" onChange={props.handleChange} />
            </div>
            <div className="type">
                <img src="/images/eating-disorder.png" alt="customer_image" />
                <input type="radio" required={true} name='customerType' value="Customer" onChange={props.handleChange} />
            </div>
        </div>
        <input type="submit" value="Submit" style={{ display: 'none' }} />
    </form>
)

const AuthenticationScreen = () => {
    axios.defaults.withCredentials = true;
    const [authType, setAuthType] = useState('log-in');
    const navigate = useNavigate();

    const storeAuthToken = (response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
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
