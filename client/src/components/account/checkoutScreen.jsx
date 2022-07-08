import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../navBar';
import Avatar from '../avatar';

import '../../styles/mainScreen.css';
import '../../styles/checkoutScreen.css';
import '../../styles/button.css';

import { tryCatch, ArrayExtension, currencyFormat } from '../../helper/util';
import Button from '../button';
import Card from '../card';

const CheckoutDisplayOrders = ({ user, cart, setUser }) => {
    const updateItemCount = (item, add) => {
        tryCatch(async () => {
            let newCount = item.count + add;
            let newCart = new ArrayExtension(...cart);
            if (newCount < 1) {
                newCount = 0;
                const index = newCart.indexOf(item);
                newCart = newCart.remove(index);
            } else {
                newCart = new ArrayExtension(...cart);
                newCart.forEach(i => {
                    if (i.name === item.name) {
                        i.count = newCount;
                    }
                });
            }
            const response = await axios.put('/api/cart/update', {
                userId: user._id,
                newCart,
            });
            console.log(response.data);
            setUser(response.data);
        })();
    }

    return (
        <div className='checkout-display-orders'>
            {user.cart && user.cart.map((item, index) => {
                return (
                    <Card className='order' key={index}>
                        <img src="\images\preview_food.jpg" alt="cart_food_image" />
                        <div className='cart-item-info'>
                            <div className="dish-details">
                                <h3>{item.name}</h3>
                                <h4>Chef: {`${user.firstName} ${user.lastName}`}</h4>
                            </div>
                            <div className="price-details">
                                <p>Qty: <span>{item.count}</span></p>
                                <div>
                                    <Button label='+' onClick={() => updateItemCount(item, 1)} />
                                    <Button label='-' onClick={() => updateItemCount(item, -1)} />
                                </div>
                                <p>Price: <span>{currencyFormat(item.price * item.count)}</span></p>
                                <p>ETA: <span>3:30PM</span></p>
                                <p>03/3/2022</p>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}


const OrderSummaryItems = ({ cart, summary: { totalBeforeTax, cleanUpService, serviceFee } }) => {
    return (
        <div className='checkout-display-order-summary-items'>
            {cart && cart.length > 0 && (
                <>
                    <div className='checkout-display-order-summary-item'>
                        <p>Items:</p>
                        <p>{currencyFormat(totalBeforeTax)}</p>
                    </div>
                    <div className='checkout-display-order-summary-item'>
                        <p>Clean Up Service:</p>
                        <p>{currencyFormat(cleanUpService)}</p>
                    </div>
                    <div className='checkout-display-order-summary-item'>
                        <p>Service Fee:</p>
                        <p>{currencyFormat(serviceFee)}</p>
                    </div>
                </>
            )}
        </div>
    );
}


const CheckoutDisplaySummary = ({ user, cart, summary }) => {
    return (
        <div className='checkout-display-order-summary'>
            <h2>Order Summary</h2>
            <OrderSummaryItems cart={cart} summary={summary} />

            <div className='checkout-display-order-item'>
                <p>Total Before Tax:</p>
                <p>{currencyFormat(summary.totalBeforeTax)}</p>
            </div>
            <div className='checkout-display-order-item'>
                <p>Estimated Tax:</p>
                <p>{currencyFormat(summary.tax)}</p>
            </div>
            <div className='checkout-display-order-total'>
                <h3>Order Total:</h3>
                <h3>{currencyFormat(summary.totalWithTax)}</h3>
            </div>

            <Button label='Place Order' />
        </div>
    )
}

const CheckoutScreen = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState(new ArrayExtension());
    const [summary, setSummary] = useState({
        cartTotal: 0,
        serviceFee: 0,
        cleanUpService: 0,
        totalBeforeTax: 0,
        tax: 0,
        totalWithTax: 0,
    });

    const location = useLocation();

    useEffect(() => {
        if (user === {}) {
            tryCatch(async () => {
                if (location.state === null) {
                    const response = await axios.get('/api/auth/login');
                    if (response.data) {
                        setUser(response.data);
                    }
                } else {
                    setUser(location.state.user);
                }
            })();
        }
        setCart(user.cart);

        const cartTotal = cart ? cart.reduce((acc, curr) => acc + curr.price, 0) : 0;
        const serviceFee = cartTotal * 0.2;

        // Tax needs to be found for the region that the user is in.
        const cleanUpService = cartTotal * 0.03;
        const totalBeforeTax = cartTotal + serviceFee + cleanUpService;

        const tax = totalBeforeTax * 0.08;
        const totalWithTax = totalBeforeTax + tax + serviceFee + cleanUpService;

        setSummary({
            cartTotal,
            serviceFee,
            cleanUpService,
            totalBeforeTax,
            tax,
            totalWithTax,
        });

        console.log("Summary: ", summary);
    }, [user]);

    return (
        <div className='main-screen'>
            <div className="main-screen-header" />
            <div className="main-screen-body">
                <NavBar user={user} />
                <Avatar user={user} navLinks={navLinks} />
                <div className='checkout'>
                    <CheckoutDisplayOrders user={user} cart={user.cart} setUser={setUser} />
                    <CheckoutDisplaySummary user={user} cart={user.cart} summary={summary} />
                </div>
            </div>
        </div>
    )
}

export default CheckoutScreen