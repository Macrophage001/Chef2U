import { useEffect } from 'react';
import axios from 'axios';
import { tryCatch } from '../helper/util';

const useGetAvatar = (user, onAvatarFound) => {
    useEffect(() => {
        tryCatch(async () => {
            if (user) {
                const response = await axios.get(`/api/account/profile-picture?userId=${user._id}`);
                onAvatarFound(response.data);
            }
        })();
    });
}

export default useGetAvatar;