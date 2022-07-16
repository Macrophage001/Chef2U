import React, { useState, useEffect, useContext, createContext } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../navBar';
import Avatar from '../ui/avatar';

import '../../styles/mainScreen.css';
import '../../styles/checkoutScreen.css';
import '../../styles/button.css';

import { tryCatch, ArrayExtension, currencyFormat } from '../../helper/util';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';

import Button from '../ui/button';
import Card from '../ui/card';
import { tryAddToStorage } from '../../helper/storageHelper';
import { CartItem, IUser } from '../../interfaces/IUser';

interface IUserContext {
    user: IUser;
    cart: CartItem[];
}
const UserContext = createContext({} as IUserContext);

const CheckoutDisplayOrders = ({ setUser }) => {
    const { user, cart } = useContext(UserContext);

    const updateItemCount = (item: CartItem, add: number) => {
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
                    if (i.name === item.name && i.chefId === item.chefId) {
                        i.count = newCount;
                    }
                });
            }
            const updatedUser = (await axios.put('/api/cart/update', { userId: user._id, newCart })).data;
            setUser(updatedUser);
            tryAddToStorage('session', 'user', updatedUser);
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
                                <h4>Chef: {item.chefName}</h4>
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


const CheckoutDisplaySummary = ({ setUser, cart, setOrderPlaced, setShowOrderStatus }) => {
    const { user } = useContext(UserContext);
    const [cartLength, setCartLength] = useState(0);

    const [summary, setSummary] = useState({
        cartTotal: 0,
        serviceFee: 0,
        cleanUpService: 0,
        totalBeforeTax: 0,
        tax: 0,
        totalWithTax: 0,
    });

    useEffect(() => {
        if (cart) {
            setCartLength(cart.length);

            const cartTotal = cart ? cart.reduce((acc, curr) => acc + curr.price * curr.count, 0) : 0;
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
        }
    }, [cart]);

    const placeOrder = () => {
        tryCatch(async () => {
            const { updatedUser, orderPlaced } = (await axios.post('/api/cart/placeOrder', { userId: user._id })).data;
            if (orderPlaced) {
                setUser(updatedUser);
                tryAddToStorage('session', 'user', updatedUser);
                console.log("Updated User After Checkout: ", updatedUser);
            } else {
                console.log('Order was not placed');
            }
            setOrderPlaced(orderPlaced);
            setShowOrderStatus(true);
        })();
    }

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

            <Button disabled={cartLength === 0} label='Place Order' onClick={placeOrder} />
        </div>
    )
}

const OrderStatus = ({ orderPlaced, setShowOrderStatus }) => {
    let messageCard: JSX.Element;

    const handleClose = (e) => {
        setShowOrderStatus(false);
    };

    if (orderPlaced) {
        messageCard = (
            <div className='order-status-display' onClick={handleClose}>
                <Card className='order-status-card'>
                    <h3>Order Placed</h3>
                    <p>Your order has been placed and is being processed. You will receive a confirmation email shortly.</p>
                </Card>
            </div>
        )
    } else {
        messageCard = (
            <div className='order-status-display' onClick={handleClose}>
                <Card className='order-status-card'>
                    <h3>Order Not Placed</h3>
                    <p>Your order has not been placed. Please try again.</p>
                </Card>
            </div>
        )
    }

    return messageCard;
}

const CheckoutScreen = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showOrderStatus, setShowOrderStatus] = useState(false);

    const loggedInUser = useLoggedInUser(useLocation());

    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);

    return (
        <>
            {showOrderStatus && <OrderStatus orderPlaced={orderPlaced} setShowOrderStatus={setShowOrderStatus} />}
            <div className='main-screen'>
                <div className="main-screen-header" />
                <div className="main-screen-body">
                    <NavBar setUser={setUser} />
                    <Avatar navLinks={navLinks} />
                    <div className='checkout'>
                        <UserContext.Provider value={{ user, cart: user.cart }}>
                            <CheckoutDisplayOrders setUser={setUser} />
                            <CheckoutDisplaySummary setUser={setUser} cart={user.cart} setOrderPlaced={setOrderPlaced} setShowOrderStatus={setShowOrderStatus} />
                        </UserContext.Provider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutScreen