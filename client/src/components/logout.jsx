import { useEffect } from 'react'
import { tryCatch } from '../helper/util'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const { user } = useLocation().state;
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