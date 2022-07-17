import React from "react";
import { IFormEventsProps } from "../../interfaces/IFormEventsProps";
import { ICredentials } from "../../interfaces/IUser";

interface ILogInFormProps extends IFormEventsProps {
    credentials: ICredentials
}

const LogInForm: React.FC<ILogInFormProps> = ({ credentials, handleOnSubmit, handleOnChange }) => {
    const {
        userName,
        password
    } = credentials;
    console.log(userName, password);

    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" name='userName' placeholder='Username...' onChange={handleOnChange} />
            <input type="password" name='password' placeholder='Password...' onChange={handleOnChange} />
            <input type="submit" value="Submit" style={{ display: 'none' }} />
        </form>
    )
}

export default LogInForm;