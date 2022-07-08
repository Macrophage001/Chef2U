import React from 'react'

import Card from '../card';

const AccountOptions = () => {
    return (
        <div className='account-options'>
            <Card className='account-option'>
                <img className='option-icon' src="\images\open-box.png" alt="orders_image" />
                <h2>Your Orders</h2>
                <p>Track your Orders, or Buy Something Again</p>
            </Card>
            <Card className='account-option'>
                <img className='option-icon' src="\images\lock.png" alt="orders_image" />
                <h2>Security</h2>
                <p>Change Login Information, Name, and Mobile Number</p>
            </Card>
            <Card className='account-option'>
                <img className='option-icon' src="\images\credit-card.png" alt="orders_image" />
                <h2>Payments</h2>
                <p>View Transacion History and Update Payment Methods</p>
            </Card>
        </div>
    );
}

export default AccountOptions