import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import NavBar from '../ui/navBar'
import Avatar from '../ui/avatar'
import Card from '../ui/card';
import Button from '../ui/button';
import AccountUpdatableOptionScreen from './accountUpdatableOptionScreen';

import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { tryAddToStorage } from '../../helper/storageHelper';
import { INavLinks } from '../../interfaces/INavLinks';
import { IUser } from '../../interfaces/IUser';
import { ScreenState } from '../../enum/screenState';
import { AccountOption } from '../../enum/accountOptions';

import '../../styles/inputs.css';
import '../../styles/accountDetailsScreen.css';

const AccountDetailsScreen: React.FC<INavLinks> = ({ navLinks }) => {
    const [user, setUser] = useState({} as IUser);
    const [optionKey, setOptionKey] = useState('');
    const [optionIndex, setOptionIndex] = useState(0);
    const [screenState, setScreenState] = useState(ScreenState.Main);
    const [accountOption, setAccountOption] = useState(AccountOption.UserName);

    const loggedInUser = useLoggedInUser(useLocation());

    const updateableAccountOptions = [
        {
            key: 'userName',
            name: 'User Name:',
            value: `${user.userName}`,
        },
        {
            key: 'password',
            name: 'Password:',
            value: ``,
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

    const handleClick = (index: number) => {
        const { key } = updateableAccountOptions[index];
        setOptionKey(key);
        setAccountOption(key as AccountOption);
        setOptionIndex(index);
        console.log(user[key as keyof IUser]);
        setScreenState(ScreenState.ChangingSetting);
    }

    return (
        <div className='main-screen'>
            <div className="main-screen-header" />
            <div className="main-screen-body">
                <NavBar user={user} setUser={setUser} />
                <Avatar navLinks={navLinks} />
                {
                    screenState === ScreenState.Main ? (
                        <div className='updatable-account-options'>
                            {updateableAccountOptions.map((option, index) => (
                                <Card className='updatable-account-option' key={index}>
                                    <div className='updatable-account-option-data'>
                                        <h3>{option.name}</h3>
                                        <p>{option.value}</p>
                                    </div>
                                    <Button onClick={() => handleClick(index)}>
                                        <p>Edit</p>
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <AccountUpdatableOptionScreen accountOption={accountOption} optionName={updateableAccountOptions[optionIndex].name} optionKey={optionKey} user={user} setUser={setUser} setScreenState={setScreenState} />
                    )
                }
            </div>
        </div>
    )
}

export default AccountDetailsScreen