import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { IUser } from '../../interfaces/IUser';
import { IUserState } from '../../interfaces/IUserState';
import { tryCatch } from '../../helper/util';
import { ScreenState } from '../../enum/screenState';
import { Validator } from '../../helper/validationHelper';

import Card from '../ui/card';
import Button from '../ui/button';

import { AccountOption } from '../../enum/accountOptions';
import { tryAddToStorage } from '../../helper/storageHelper';

import '../../styles/mainScreen.css';
import '../../styles/inputs.css';
import '../../styles/updatableOptionScreen.css';
import { passwordRules } from '../../helper/rules/passwordRules';
interface IAccountUpdatableOptionScreenProps extends IUserState {
    optionName: string;
    optionKey: string;
    accountOption: AccountOption;
    setScreenState: React.Dispatch<React.SetStateAction<ScreenState>>;
}

enum ChangeState {
    Unchanged,
    ConfirmingChange,
    ConfirmedChange,
    ErrorDuringChange,
}

const AccountUpdatableOptionScreen: React.FC<IAccountUpdatableOptionScreenProps> = ({ accountOption, user, optionName, setUser, setScreenState }) => {
    const [userValue, setUserValue] = useState(user[accountOption as keyof IUser]);
    const [changeState, setChangeState] = useState(ChangeState.Unchanged);
    const [errorMessages, setErrorMessages] = useState([] as string[]);

    useEffect(() => {
        console.log('Current Change State: ', changeState);
        if (accountOption !== AccountOption.Password) {
            setUserValue(user[accountOption as keyof IUser]);
        } else {
            setUserValue('');
        }
    }, [accountOption]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserValue(value);
    }

    const handleAccountOption = () => {
        const { validatePassword, validateEmail } = Validator;
        switch (accountOption) {
            case AccountOption.Password:
                const [isValid, errorMsgs] = validatePassword(userValue as string, passwordRules);
                console.log(isValid, errorMsgs);
                if (isValid) {
                    console.log('Valid');
                    setErrorMessages([]);
                    setChangeState(ChangeState.ConfirmingChange);
                } else {
                    console.log('Invalid');
                    setErrorMessages(errorMsgs);
                }
                break;
            default:
                setChangeState(ChangeState.ConfirmingChange);
                break;
        }
    }

    const handleClick = () => {
        switch (changeState) {
            case ChangeState.Unchanged:
                handleAccountOption();
                break;
            case ChangeState.ConfirmingChange:
                tryCatch(async () => {
                    const response = await axios.post(`/api/account/update?userId=${user._id}`, { [accountOption as string]: userValue });
                    if (response.status === 200) {
                        console.log(response.data);

                        setUser?.(response.data);
                        tryAddToStorage('session', 'user', response.data);

                        setChangeState(ChangeState.ConfirmedChange);
                        setScreenState(ScreenState.Main);
                    } else {
                        console.log(response.data);
                        setChangeState(ChangeState.ErrorDuringChange);
                    }
                })();
                break;
        }

    }

    return (
        <>
            <Card className='updatable-account-selected-option'>
                <p>If you want to change the {accountOption as string} associated with your Chef2U Account, you can do so here.</p>
                <p>Make sure you click the 'Save Changes' button when you are done.</p>

                <div className='updatable-account-option-input-container'>
                    <label>New {optionName}</label>
                    <input className='text-input' type={accountOption === AccountOption.Password ? 'password' : 'text'} placeholder={userValue as string} onChange={handleChange} />
                </div>

                <>
                    {changeState === ChangeState.ConfirmingChange
                        && accountOption !== AccountOption.Password
                        ? <p>Are you sure you want to change your <span>{optionName.replace(':', '')}</span> to <span>{userValue as string}</span>?</p>
                        : <p>Are you sure you want to change your <span>{optionName.replace(':', '')}?</span></p>}
                </>
                {changeState === ChangeState.ConfirmedChange && (<p><span>{optionName}</span> successfully changed to <span>{userValue as string}</span></p>)}
                {changeState === ChangeState.ErrorDuringChange && (<p>Error while changing <span>{optionName}</span></p>)}
                {errorMessages && errorMessages.map((errorMessage, index) => (<p key={index} className='error-msg'>{errorMessage}</p>))}
            </Card>
            <Button className='updatable-account-option-save-button' onClick={handleClick}>
                <p>Save Changes</p>
            </Button>
        </>
    )
}

export default AccountUpdatableOptionScreen;