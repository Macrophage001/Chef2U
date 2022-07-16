import React from "react";
import { ICredentials } from "../../interfaces/IUser";

interface ILogInFormProps {
    credentials: ICredentials
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogInForm: React.FC<ILogInFormProps> = ({ credentials, handleSubmit, handleChange }) => {
    const {
        userName,
        password
    } = credentials;
    console.log(userName, password);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='userName' placeholder='Username...' onChange={handleChange} />
            <input type="password" name='password' placeholder='Password...' onChange={handleChange} />
            <input type="submit" value="Submit" style={{ display: 'none' }} />
        </form>
    )
}

export default LogInForm;