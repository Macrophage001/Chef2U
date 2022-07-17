import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import NavBar from '../ui/navBar'
import Avatar from '../ui/avatar'
import Card from '../ui/card';
import Button from '../ui/button';

import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { tryAddToStorage } from '../../helper/storageHelper';
import { INavLinks } from '../../interfaces/INavLinks';
import { IUser } from '../../interfaces/IUser';

import '../../styles/inputs.css';
import '../../styles/accountDetailsScreen.css';

const AccountDetailsScreen: React.FC<INavLinks> = ({ navLinks }) => {
    const [user, setUser] = useState({} as IUser);
    const loggedInUser = useLoggedInUser(useLocation());

    const updateableAccountOptions = [
        {
            key: 'userName',
            name: 'User Name:',
            value: `${user.userName}`,
        },
        {
            key: 'email',
            name: 'Email:',
            value: `${user.email}`,
        },
        {
            key: 'mobilePhoneNumber',
            name: 'Mobile Phone Number:',
            value: '+1 (202) 555-1212',
        },
        {
            key: 'avatar',
            name: 'Profile Picture:',
            value: '',
        }
    ]

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);
    useEffect(() => {
        tryAddToStorage('session', 'user', user);
    }, [user]);

    const handleClick = () => {
        console.log('clicked');
    }

    return (
        <div className='main-screen'>
            <div className="main-screen-header" />
            <div className="main-screen-body">
                <NavBar user={user} setUser={setUser} />
                <Avatar navLinks={navLinks} />
                <div className='updatable-account-options'>
                    {updateableAccountOptions.map((option, index) => (
                        <Card className='updatable-account-option' key={index}>
                            <div className='updatable-account-option-data'>
                                <h3>{option.name}</h3>
                                <p>{option.value}</p>
                            </div>
                            <Button label='Edit' onClick={handleClick} />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AccountDetailsScreen