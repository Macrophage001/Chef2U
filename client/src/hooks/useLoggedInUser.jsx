import { useEffect, useState } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';
import { tryAddToStorage, tryGetFromStorage } from '../helper/storageHelper';

export const useLoggedInUser = (location) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        tryCatch(async () => {
            const sessionUser = tryGetFromStorage('session', 'user');
            if (sessionUser._id !== undefined) {
                setUser(sessionUser);
            } else {
                let user = {};
                if (!location.state) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        user = response.data;
                    }
                } else {
                    user = location.state.user;
                }
                setUser(user);
                tryAddToStorage('session', 'user', user);
            }
        })();
    }, []);

    return user;
}