import { useEffect, useState } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';
import { tryAddToStorage, tryGetFromStorage } from '../helper/storageHelper';
import { IUser } from '../interfaces/IUser';
import { Location } from 'react-router-dom';

interface CustomLocation extends Location {
    state: any
}

export const useLoggedInUser = (location: CustomLocation) => {
    const [user, setUser] = useState({} as IUser);

    useEffect(() => {
        tryCatch(async () => {
            const sessionUser = tryGetFromStorage('session', 'user');
            if (sessionUser._id !== undefined) {
                setUser(sessionUser);
            } else {
                let foundUser = {} as IUser;

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
    }, [location.state]);

    return user;
}