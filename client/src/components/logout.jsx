import { useState, useEffect } from 'react'
import { tryCatch } from '../helper/util'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const Logout = () => {
    const [user, setUser] = useState({});
    useLoggedInUser(useLocation(), user => setUser(user));
    const navigate = useNavigate();
    useEffect(() => {
        tryCatch(async () => {
            await axios.post('/api/auth/logout', user);
            localStorage.removeItem('user');
            navigate('/');
        })()
    }, []);
}

export default Logout