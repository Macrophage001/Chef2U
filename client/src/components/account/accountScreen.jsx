import React from 'react'
import { useLocation } from 'react-router-dom';

import Avatar from '../avatar';
import AccountOptions from './accountOptions';

import '../../styles/accountScreen.css';
import NavBar from '../navBar';

const AccountScreen = ({ navLinks }) => {
    const { user } = useLocation().state;
    return (
        <div className='account-screen'>
            <div className="account-screen-header" />
            <div className="account-screen-body">
                <NavBar user={user} />
                <Avatar user={user} navLinks={navLinks} />
                <AccountOptions />
            </div>
        </div>
    )
}

export default AccountScreen