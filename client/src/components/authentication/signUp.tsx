import React from 'react'
import { IFormEventsProps } from '../../interfaces/IFormEventsProps';
import { ICredentials } from '../../interfaces/IUser';

interface ISignUpFormProps extends IFormEventsProps {
    credentials: ICredentials;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({
    credentials,
    handleOnSubmit,
    handleOnChange,
}) => {
    const {
        userName,
        password,
        firstName,
        lastName,
        email,
        passwordConfirmation
    } = credentials;
    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" name='firstName' placeholder='First Name...' onChange={handleOnChange} />
            <input type="text" name='lastName' placeholder='Last Name...' onChange={handleOnChange} />
            <input type="text" name='userName' placeholder='User Name...' onChange={handleOnChange} />
            <input type="text" name='email' placeholder='Email...' onChange={handleOnChange} />
            <input type="password" name='password' placeholder='Password...' onChange={handleOnChange} />
            <input type="password" name='passwordConfirmation' placeholder='Confirm Password...' onChange={handleOnChange} />

            <h2>Are you a:</h2>
            <div className="form-customer-type">
                <div className="type">
                    <img src="/images/chef.png" alt="chef_image" />
                    <input type="radio" required={true} name='customerType' value="Chef" onChange={handleOnChange} />
                </div>
                <div className="type">
                    <img src="/images/eating-disorder.png" alt="customer_image" />
                    <input type="radio" required={true} name='customerType' value="Customer" onChange={handleOnChange} />
                </div>
            </div>
            <input type="submit" value="Submit" style={{ display: 'none' }} />
        </form>
    )
}
export default SignUpForm