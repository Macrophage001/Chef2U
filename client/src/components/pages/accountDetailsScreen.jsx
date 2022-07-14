import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import NavBar from '../navBar'
import Avatar from '../ui/avatar'

import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { tryAddToStorage } from '../../helper/storageHelper';

import '../../styles/inputs.css';
import '../../styles/accountDetailsScreen.css';

const AccountDetailsUpdateForm = ({ user, setUser }) => {
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(updatedUser);
    }

    return (
        <>
            <form className="account-details-update-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">User Name</label>
                    <input className='text-input' type="text" id="userName" name="userName" value={updatedUser.userName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input className='text-input' type="text" id="firstName" name="firstName" value={updatedUser.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input className='text-input' type="text" id="lastName" name="lastName" value={updatedUser.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className='text-input' type="email" id="email" name="email" value={updatedUser.email} onChange={handleChange} />
                </div>
                <input type="submit" value="Update" />
            </form>
        </>
    )
}

const AccountDetailsScreen = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const loggedInUser = useLoggedInUser(useLocation());
    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);
    useEffect(() => {
        tryAddToStorage('session', 'user', user);
    }, [user]);

    return (
        <div className='main-screen'>
            <div className="main-screen-header" />
            <div className="main-screen-body">
                <NavBar user={user} setUser={setUser} />
                <Avatar user={user} navLinks={navLinks} />
                <AccountDetailsUpdateForm user={user} setUser={setUser} />
            </div>
        </div>
    )
}

export default AccountDetailsScreen