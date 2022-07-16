import React from 'react'
import { useNavigate } from 'react-router-dom';

import Card from '../ui/card';

const AccountOptions = () => {
    const navigate = useNavigate();
    const Options = [
        {
            icon: '\\images\\open-box.png',
            title: 'Your Orders',
            description: 'Track your Orders, or Buy Something Again',
            link: '/account/orders'
        },
        {
            icon: '\\images\\lock.png',
            title: 'Security',
            description: 'Manage your Account, and Change your Password',
            link: '/account/profile'
        },
        {
            icon: '\\images\\credit-card.png',
            title: 'Payments',
            description: 'Manage your Credit Card, and Pay for your Orders',
            link: '/account/payments'
        }
    ]

    return (
        <div className='account-options'>
            {Options.map((option, index) => {
                return (
                    <Card className='account-option' onClick={() => navigate(option.link)}>
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