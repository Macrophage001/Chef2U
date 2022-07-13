import React, { useState, useEffect, useContext, createContext } from 'react'
import { useLocation } from 'react-router-dom';

import NavBar from './navBar';
import Avatar from './avatar';

import '../styles/mainScreen.css';
import '../styles/orderHistoryScreen.css';
import '../styles/button.css';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { currencyFormat } from '../helper/util';
import Card from './card';

const UserContext = createContext({});

const OrderHistory = () => {
    const { user } = useContext(UserContext);

    return (
        <div className='orders-display'>
            {user.orderHistory && user.orderHistory.map((item, index) => {
                return (
                    <Card className='order' key={index}>
                        <img src="\images\preview_food.jpg" alt="cart_food_image" />
                        <div className='cart-item-info'>
                            <div className="dish-details">
                                <h3>{item.name}</h3>
                                <h4>Chef: {item.chefName}</h4>
                            </div>
                            <div className="price-details">
                                <p>Qty: <span>{item.count}</span></p>
                                <p>Price: <span>{currencyFormat(item.price * item.count)}</span></p>
                                <p>Date Ordered: {item.dateOrdered}</p>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

const OrderHistoryScreen = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const loggedInUser = useLoggedInUser(useLocation());

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);

    return (
        <div className='main-screen'>
            <div className="main-screen-header" />
            <div className="main-screen-body">
                <NavBar user={user} setUser={setUser} />
                <Avatar user={user} navLinks={navLinks} />
                <div className='orders'>
                    <UserContext.Provider value={{ user, cart: user.cart }}>
                        <OrderHistory />
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryScreen