import { useEffect, useState } from 'react';
import { tryCatch } from '../helper/util';
import { Buffer } from 'buffer';
import axios from 'axios';

export const useGetAvatar = (user, deps = []) => {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user.avatar')) {
            const decodedAvatar = JSON.parse(localStorage.getItem('user.avatar'));
            // console.log("Avatar Found in Local Storage: ", decodedAvatar);
            setAvatar(`data:${decodedAvatar.contentType};base64,${Buffer.from(decodedAvatar.data, 'base64').toString('base64')}`);
        } else {
            tryCatch(async () => {
                if (user !== undefined && user._id !== undefined) {
                    const response = await axios.get(`/api/account/avatar?userId=${user._id}`);
                    if (response.data) {
                        // console.log("Avatar Response Data: ", response.data);
                        const decodedAvatar = { ...response.data, data: Buffer.from(response.data.data, 'base64').toString('base64') };
                        // console.log("Decoded Avatar: ", decodedAvatar);
                        localStorage.setItem('user.avatar', JSON.stringify(decodedAvatar));
                        setAvatar(`data:${decodedAvatar.contentType};base64,${Buffer.from(decodedAvatar.data, 'base64').toString('base64')}`);
                    }
                }
            })();
        }
    }, [user, ...deps]);

    return avatar;
}

export const useGetAvatars = (users, deps = []) => {
    const [avatars, setAvatars] = useState([]);
    useEffect(() => {
        tryCatch(() => {
            if (users !== undefined && users.length > 0) {
                users.forEach(async (user) => {
                    if (user !== undefined && user._id !== undefined) {
                        const response = await axios.get(`/api/account/avatar?userId=${user._id}`);
                        if (response.data) {
                            // console.log("Avatar Response Data: ", response.data);
                            const decodedAvatar = { ...response.data, data: Buffer.from(response.data.data, 'base64').toString('base64') };
                            // console.log("Decoded Avatar: ", decodedAvatar);
                            const newAvatars = [...avatars, `data:${decodedAvatar.contentType};base64,${Buffer.from(decodedAvatar.data, 'base64').toString('base64')}`];
                            setAvatars(newAvatars);
                        }
                    }
                });
            }
        })();
    }, [users, ...deps]);
}