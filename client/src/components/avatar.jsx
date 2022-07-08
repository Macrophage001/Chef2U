import React from 'react'
import { Link } from 'react-router-dom';
import { generateUUID } from '../helper/util';

import '../styles/avatar.css';

const Avatar = ({ user, navLinks }) => {
    return (
        <div className="avatar">
            <div className="avatar-menu">
                <div className="avatar-preview-info">
                    <p>{user.userName}</p>
                </div>
                <div className="avatar-dropdown-menu">
                    {navLinks && navLinks.map((link, index) => (<Link key={generateUUID(index)} to={link.link} state={{ user }}>{link.name}</Link>))}
                </div>
            </div>
            <div className="avatar-icon">
                <img src={user.avatar ? `data:image/${user.avatar.contentType};base64,${user.avatar.data.toString('base64')}` : "\\images\\user.png"} alt="avatar" />
            </div>
        </div>
    )
}

export default Avatar