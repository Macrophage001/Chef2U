import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import Avatar from '../ui/avatar';
import AccountOptions from '../account/accountOptions';

import '../../styles/accountScreen.css';
import NavBar from '../navBar';
import { tryCatch } from '../../helper/util';

import axios from 'axios';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';

const UploadAvatar = ({ handleOnSubmit, handleOnChange }) => {
    return (
        <form onSubmit={handleOnSubmit} method="post" encType="multipart/form-data">
            <input type="file" name="profile-img" onChange={handleOnChange} />
            <button type="submit">Upload</button>
        </form>
    )
}

const AccountScreen = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const [profileImg, setProfileImg] = useState('');

    const loggedInUser = useLoggedInUser(useLocation());

    useEffect(() => {
        if (user._id === undefined) {
            setUser(loggedInUser);
        }
    }, [loggedInUser, user]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        tryCatch(async () => {
            const formData = new FormData();
            formData.append('profile-img', profileImg);
            const response = await axios.post(`/api/account/avatar?userId=${user._id}`, formData);
        })();
    }

    const handleOnChange = (e) => {
        setProfileImg(e.target.files[0]);
    }

    return (
        <div className='account-screen'>
            <div className="account-screen-header" />
            <div className="account-screen-body">
                {/* <UploadAvatar handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} /> */}
                <NavBar user={user} setUser={setUser} />
                <Avatar user={user} navLinks={navLinks} />
                <AccountOptions />
            </div>
        </div>
    )
}

export default AccountScreen