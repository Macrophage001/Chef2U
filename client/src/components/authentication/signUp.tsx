import React from 'react'
import { ICredentials } from '../../interfaces/IUser';

interface ISignUpFormProps {
    credentials: ICredentials;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({
    credentials,
    handleSubmit,
    handleChange,
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
        <form onSubmit={handleSubmit}>
            <input type="text" name='firstName' placeholder='First Name...' value={firstName} onChange={handleChange} />
            <input type="text" name='lastName' placeholder='Last Name...' value={lastName} onChange={handleChange} />
            <input type="text" name='userName' placeholder='User Name...' value={userName} onChange={handleChange} />
            <input type="text" name='email' placeholder='Email...' value={email} onChange={handleChange} />
            <input type="password" name='password' placeholder='Password...' value={password} onChange={handleChange} />
            <input type="password" name='passwordConfirmation' placeholder='Confirm Password...' value={passwordConfirmation} onChange={handleChange} />

            <h2>Are you a:</h2>
            <div className="form-customer-type">
                <div className="type">
                    <img src="/images/chef.png" alt="chef_image" />
                    <input type="radio" required={true} name='customerType' value="Chef" onChange={handleChange} />
                </div>
                <div className="type">
                    <img src="/images/eating-disorder.png" alt="customer_image" />
                    <input type="radio" required={true} name='customerType' value="Customer" onChange={handleChange} />
                </div>
            </div>
            <input type="submit" value="Submit" style={{ display: 'none' }} />
        </form>
    )
}
export default SignUpForm