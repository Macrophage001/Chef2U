import { useState, useEffect } from 'react'
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
                // console.log("User Logging Out: ", user);
                const response = await axios.post(`/api/auth/logout?userId=${user._id}`);
                localStorage.removeItem('user');
                // console.log("Logout Response: ", response);
                navigate('/');
            })();
        }
    }, [user]);

    return (
        <div className="logout">
            <p>Logging out...</p>
        </div>
    )
}

export default Logout