import React from 'react'

import NavBar from '../ui/navBar'
import Avatar from '../ui/avatar'

import { INavLinks } from '../../interfaces/INavLinks'
import { IUserState } from '../../interfaces/IUserState';

import '../../styles/mainScreen.css';

interface IAccountUpdatableOptionScreenProps extends IUserState, INavLinks { }

const AccountUpdatableOptionScreen: React.FC<IAccountUpdatableOptionScreenProps> = ({ user, setUser, navLinks }) => {
    return (
        <div className={`main-screen`}>
            <div className="main-screen-header" />
            <div className="main-screen-body">
                <NavBar user={user} setUser={setUser} />
                <Avatar navLinks={navLinks} />
            </div>
        </div>
    )
}

export default AccountUpdatableOptionScreen;