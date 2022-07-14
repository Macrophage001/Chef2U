import React from 'react'

const SignUpForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text" name='firstName' placeholder='First Name...' value={props.name} onChange={props.handleChange} />
        <input type="text" name='lastName' placeholder='Last Name...' value={props.name} onChange={props.handleChange} />
        <input type="text" name='userName' placeholder='User Name...' value={props.name} onChange={props.handleChange} />
        <input type="text" name='email' placeholder='Email...' value={props.email} onChange={props.handleChange} />
        <input type="password" name='password' placeholder='Password...' value={props.password} onChange={props.handleChange} />
        <input type="password" name='passwordConfirmation' placeholder='Confirm Password...' value={props.passwordConfirmation} onChange={props.handleChange} />

        <h2>Are you a:</h2>
        <div className="form-customer-type">
            <div className="type">
                <img src="/images/chef.png" alt="chef_image" />
                <input type="radio" required={true} name='customerType' value="Chef" onChange={props.handleChange} />
            </div>
            <div className="type">
                <img src="/images/eating-disorder.png" alt="customer_image" />
                <input type="radio" required={true} name='customerType' value="Customer" onChange={props.handleChange} />
            </div>
        </div>
        <input type="submit" value="Submit" style={{ display: 'none' }} />
    </form>
)

export default SignUpForm