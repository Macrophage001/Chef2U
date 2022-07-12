import { useEffect, useState } from 'react';
import { tryCatch } from '../helper/util';
import { tryGetFromStorage, tryAddToStorage } from '../helper/storageHelper';
import { Buffer } from 'buffer';
import axios from 'axios';

const singleAvatarKey = user => `user.avatar.${user._id}`;

export const useGetAvatar = (user, deps = []) => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (window.sessionStorage.getItem(singleAvatarKey(user))) {
            // const decodedAvatar = JSON.parse(window.sessionStorage.getItem(singleAvatarKey(user)));
            const decodedAvatar = JSON.parse(tryGetFromStorage('session', singleAvatarKey(user)));
            setAvatar(`data:${decodedAvatar.contentType};base64,${Buffer.from(decodedAvatar.data, 'base64').toString('base64')}`);
        } else {
            tryCatch(async () => {
                if (user !== undefined && user._id !== undefined) {
                    const response = await axios.get(`/api/account/avatar?userId=${user._id}`);
                    if (response.data) {
                        const decodedAvatar = { ...response.data, data: Buffer.from(response.data.data, 'base64').toString('base64') };
                        // window.sessionStorage.setItem(singleAvatarKey(user), JSON.stringify(decodedAvatar));
                        tryAddToStorage('session', singleAvatarKey(user), JSON.stringify(decodedAvatar));
                        setAvatar(`data:${decodedAvatar.contentType};base64,${Buffer.from(decodedAvatar.data, 'base64').toString('base64')}`);
                    }
                }
            })();
        }
    }, [user, ...deps]);

    return avatar;
}