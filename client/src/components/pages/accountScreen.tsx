import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Avatar from '../ui/avatar';
import AccountOptions from '../account/accountOptions';
import AccountUpdatableOptionScreen from './accountUpdatableOptionScreen';
import NavBar from '../ui/navBar';

import { tryCatch } from '../../helper/util';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { INavLinks } from '../../interfaces/INavLinks';
import { IUser } from '../../interfaces/IUser';

import { IFormEventsProps } from '../../interfaces/IFormEventsProps';

import '../../styles/mainScreen.css';
import '../../styles/accountScreen.css';

interface UploadAvatarProps extends IFormEventsProps {
    formRef: React.RefObject<HTMLFormElement>;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ formRef, handleOnSubmit, handleOnChange }) => {
    return (
        <form ref={formRef} onSubmit={handleOnSubmit} method="post" encType="multipart/form-data">
            <input type="text" name="testInfo" value="Testing 123..." onChange={handleOnChange} />
            <input type="file" name="profile-img" onChange={handleOnChange} />
            <button type="submit">Upload</button>
        </form>
    )
}


const AccountScreen: React.FC<INavLinks> = ({ navLinks }) => {
    const [formData, setFormData] = useState(new FormData());
    const [user, setUser] = useState({} as IUser);

    const formRef = useRef<HTMLFormElement>(null);

    const loggedInUser = useLoggedInUser(useLocation());

    useEffect(() => {
        if (user._id === undefined) {
            setUser(loggedInUser);
        }
    }, [loggedInUser, user]);

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        tryCatch(async () => {
            await axios.post(`/api/account/avatar?userId=${user._id}`, formData);
        })();
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(new FormData(formRef.current as HTMLFormElement));
    }

    return (
        <div className='account-screen'>
            <div className="account-screen-header" />
            <div className="account-screen-body">
                <NavBar user={user} setUser={setUser} />
                <Avatar navLinks={navLinks} />
                <AccountOptions />
            </div>
        </div>
    )
}

export default AccountScreen