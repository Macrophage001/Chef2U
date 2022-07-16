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
                let foundUser = {};
                if (!location.state) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        foundUser = response.data;
                    }
                } else {
                    foundUser = location.state.user;
                }
                setUser(foundUser);
                tryAddToStorage('session', 'user', foundUser);
            }
        })();
    }, []);

    return user;
}