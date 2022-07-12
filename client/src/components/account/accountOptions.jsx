import React from 'react'

import Card from '../card';

const AccountOptions = () => {
    const Options = [
        {
            icon: '\\images\\open-box.png',
            title: 'Your Orders',
            description: 'Track your Orders, or Buy Something Again'
        },
        {
            icon: '\\images\\lock.png',
            title: 'Security',
            description: 'Manage your Account, and Change your Password'
        },
        {
            icon: '\\images\\credit-card.png',
            title: 'Payments',
            description: 'Manage your Credit Card, and Pay for your Orders'
        },
        {
            icon: '\\images\\lock.png',
            title: 'Settings',
            description: 'Manage your Account, and Change your Password'
        }
    ]

    return (
        <div className='account-options'>
            {Options.map((option, index) => {
                return (
                    <Card className='account-option'>
                        <img className='option-icon' src={option.icon} alt="orders_image" />
                        <h2>{option.title}</h2>
                        <p>{option.description}</p>
                    </Card>
                )
            })}
        </div>
    );
}

export default AccountOptions