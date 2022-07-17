import React from 'react';
import { IUser } from './IUser';

export interface IUserState {
    user: IUser;
    setUser?: React.Dispatch<React.SetStateAction<IUser>>;
}