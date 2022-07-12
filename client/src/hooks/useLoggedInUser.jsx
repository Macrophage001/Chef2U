import { useEffect, useState } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';
import { tryAddToStorage, tryGetFromStorage } from '../helper/storageHelper';

/**
 * @deprecated Use useLoggedInUserAlt(location) instead.
 * @param {*} location 
 * @param {*} onUserFound
 */
export const useLoggedInUser = (location, onUserFound) => {
    useEffect(() => {
        tryCatch(async () => {
            const sessionUser = tryGetFromStorage('session', 'user');
            if (sessionUser._id !== undefined) {
                onUserFound(sessionUser);
            } else {
                if (!location.state) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        onUserFound(response.data);
                        tryAddToStorage('session', 'user', response.data);
                    }
                } else {
                    onUserFound(location.state.user);
                    tryAddToStorage('session', 'user', location.state.user);
                }
            }
        })();
    }, []);
};

export const useLoggedInUserAlt = (location) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        tryCatch(async () => {
            const sessionUser = tryGetFromStorage('session', 'user');
            if (sessionUser._id !== undefined) {
                setUser(sessionUser);
            } else {
                if (!location.state) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        setUser(response.data);
                        tryAddToStorage('session', 'user', response.data);
                    }
                } else {
                    setUser(location.state.user);
                    tryAddToStorage('session', 'user', location.state.user);
                }
            }
        })();
    }, []);

    return user;
}