import { useEffect, useState } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';
import { tryAddToStorage, tryGetFromStorage } from '../helper/storageHelper';
import { IUser } from '../interfaces/IUser';

export const useLoggedInUser = (location): IUser => {
    const [user, setUser] = useState({} as IUser);

    useEffect(() => {
        tryCatch(async () => {
            const sessionUser = tryGetFromStorage('session', 'user');
            if (sessionUser._id !== undefined) {
                setUser(sessionUser);
            } else {
                let user = {} as IUser;
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