import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { generateUUID } from '../../helper/util';

import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { useGetAvatar } from '../../hooks/useGetAvatar';

import { IUser } from '../../interfaces/IUser';
import { IUserState } from '../../interfaces/IUserState';
import { INavLinks } from '../../interfaces/INavLinks';

import '../../styles/avatar.css';

interface AvatarMenuProps extends IUserState, INavLinks { }

const AvatarMenu: React.FC<AvatarMenuProps> = ({ user, navLinks }) => {
    return (
        <div className="avatar-menu">
            <div className="avatar-preview-info">
                <p>{user.userName}</p>
            </div>
            <div className="avatar-dropdown-menu">
                {navLinks && navLinks.map((link, index) => (<Link key={generateUUID(index)} to={link.link} state={{ user }}>{link.name}</Link>))}
            </div>
        </div>
    )
}

const Avatar: React.FC<INavLinks> = ({ navLinks }) => {
    const [user, setUser] = useState({} as IUser);
    const [avatar, setAvatar] = useState('');

    const loggedInUser = useLoggedInUser(useLocation());
    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);

    const avatarURI = useGetAvatar(user);
    useEffect(() => {
        setAvatar(avatarURI);
    }, [avatarURI]);

    return (
        <div className="avatar">
            <AvatarMenu user={user} setUser={setUser} navLinks={navLinks} />
            <div className="avatar-icon">
                <img src={avatar !== '' ? avatar : "\\images\\user.png"} alt="avatar" />
            </div>
        </div>
    )
}

export default Avatar