import React, { useState, useEffect } from 'react';
import { tryCatch } from '../helper/util'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { IUser } from '../interfaces/IUser';

const Logout = () => {
    const [user, setUser] = useState({} as IUser);
    const loggedInUser = useLoggedInUser(useLocation());

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);

    const navigate = useNavigate();
    useEffect(() => {
        if (user._id !== undefined) {
            tryCatch(async () => {
                const response = await axios.post(`/api/auth/logout?userId=${user._id}`);
                localStorage.removeItem('user');
                navigate('/');
            })();
        }
    }, [user]);

    return (
        <h1>Logout</h1>
    )
}

export default Logout