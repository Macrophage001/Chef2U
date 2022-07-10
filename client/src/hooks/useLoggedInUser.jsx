import { useEffect } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';

export const useLoggedInUser = (location, onUserFound) => {
    useEffect(() => {
        tryCatch(async () => {
            // console.log(location);
            if (!location.state) {
                // console.log("Requesting user from server");
                const response = await axios.get('/api/auth/login');
                if (response.data) {
                    onUserFound(response.data);
                }
            } else {
                // console.log("User found in location state");
                onUserFound(location.state.user);
            }
        })();
    }, []);
};