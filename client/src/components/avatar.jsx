import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { generateUUID } from '../helper/util';

import { useLoggedInUser, useLoggedInUserAlt } from '../hooks/useLoggedInUser';
import { tryCatch } from '../helper/util';

import axios from 'axios';

import '../styles/avatar.css';
import { useGetAvatar } from '../hooks/useGetAvatar';

const AvatarMenu = ({ user, setUser, navLinks }) => {
    return (
        <div className="avatar-menu">
            <div className="avatar-preview-info">
                <p>{user.userName}</p>
            </div>
            <div className="avatar-dropdown-menu">
                {navLinks && navLinks.map((link, index) => (<Link key={generateUUID(index)} to={link.link} state={{ user, setUser }}>{link.name}</Link>))}
            </div>
        </div>
    )
}


const Avatar = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState('');

    useLoggedInUser(useLocation(), user => {
        setUser(user);
    });

    // const loggedInUser = useLoggedInUserAlt(useLocation());
    const avatarURI = useGetAvatar(user);
    useEffect(() => {
        setAvatar(avatarURI);
        // console.log("Avatar: ", avatarURI);
    }, [user, avatarURI]);

    return (
        <div className="avatar">
            <AvatarMenu user={user} setUser={setUser} navLinks={navLinks} />
            <div className="avatar-icon">
                <img src={avatar ? avatar : "\\images\\user.png"} alt="avatar" />
            </div>
        </div>
    )
}

export default Avatar