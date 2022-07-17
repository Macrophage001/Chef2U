import { useEffect, useState } from 'react';
import { tryCatch } from '../helper/util';
import { tryGetFromStorage, tryAddToStorage } from '../helper/storageHelper';
import { Buffer } from 'buffer';
import axios from 'axios';
import { IUser } from '../interfaces/IUser';

const singleAvatarKey = (user: IUser) => `user.avatar.${user._id}`;

export const useGetAvatar = (user: IUser, deps = []): string => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const sessionStorage = tryGetFromStorage('session', singleAvatarKey(user));
        // console.log("Session Storage", sessionStorage);
        if (sessionStorage.data) {
            const decodedAvatar = JSON.parse(sessionStorage);
            if (decodedAvatar.contentType !== '' && decodedAvatar.data !== null) {
                setAvatar(`data:${decodedAvatar.contentType};base64,${Buffer.from(decodedAvatar.data, 'base64').toString('base64')}`);
            }
        } else {
            tryCatch(async () => {
                if (user !== undefined && user._id !== undefined) {
                    const response = await axios.get(`/api/account/avatar?userId=${user._id}`);
                    if (response.data) {
                        const decodedAvatar = { ...response.data, data: Buffer.from(response.data.data, 'base64').toString('base64') };
                        if (decodedAvatar.contentType !== '' && decodedAvatar.data !== null) {
                            setAvatar(`data:${decodedAvatar.contentType};base64,${decodedAvatar.data}`);
                            tryAddToStorage('session', singleAvatarKey(user), JSON.stringify(decodedAvatar));
                        }
                    }
                }
            })();
        }
    }, [user, ...deps]);

    return avatar;
}