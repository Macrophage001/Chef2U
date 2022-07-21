import React from "react";
import { IFormEventsProps } from "../../interfaces/IFormEventsProps";
import { ICredentials } from "../../interfaces/IUser";

interface ILogInFormProps extends IFormEventsProps {
    credentials: ICredentials
}

const LogInForm: React.FC<ILogInFormProps> = ({ credentials, handleOnSubmit, handleOnChange }) => {
    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" name='userName' placeholder='Username...' value={credentials.userName} onChange={handleOnChange} />
            <input type="password" name='password' placeholder='Password...' value={credentials.password} onChange={handleOnChange} />
            <input type="submit" value="Submit" style={{ display: 'none' }} />
        </form>
    )
}

export default LogInForm;