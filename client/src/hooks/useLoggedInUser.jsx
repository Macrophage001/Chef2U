import { useEffect, useState } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';

/**
 * @deprecated Use useLoggedInUserAlt(location) instead.
 * @param {*} location 
 * @param {*} onUserFound
 */
export const useLoggedInUser = (location, onUserFound) => {
    useEffect(() => {
        tryCatch(async () => {
            if (localStorage.getItem('user')) {
                // console.log("User Found in Local Storage: ", JSON.parse(localStorage.getItem('user')));
                onUserFound(JSON.parse(localStorage.getItem('user')));
            } else {
                if (!location.state) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        onUserFound(response.data);
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                } else {
                    onUserFound(location.state.user);
                    localStorage.setItem('user', JSON.stringify(location.state.user));
                }
            }
        })();
    }, []);
};

export const useLoggedInUserAlt = (location) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem('user')) {
            // console.log("User Found in Local Storage: ", JSON.parse(localStorage.getItem('user')));
            setUser(JSON.parse(localStorage.getItem('user')));
        } else {
            tryCatch(async () => {
                if (!location.state) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        setUser(response.data);
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                } else {
                    setUser(location.state.user);
                    localStorage.setItem('user', JSON.stringify(location.state.user));
                }
            })();
        }
    }, []);

    return user;
}