import React, { useState, useEffect, useContext, createContext, SetStateAction, SyntheticEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../navBar';
import Avatar from '../ui/avatar';

import { tryCatch, currencyFormat } from '../../helper/util';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { INavLinks } from '../../interfaces/INavLinks';

import Button from '../ui/button';
import Card from '../ui/card';
import { tryAddToStorage } from '../../helper/storageHelper';
import { IRecipeCartItem, IUser } from '../../interfaces/IUser';

import '../../styles/mainScreen.css';
import '../../styles/checkoutScreen.css';
import '../../styles/button.css';

type SummaryType = {
    cartTotal: number;
    serviceFee: number;
    cleanUpService: number;
    totalBeforeTax: number;
    tax: number;
    totalWithTax: number;
}
interface IUserContext {
    user: IUser;
    cart: IRecipeCartItem[];
}
interface ISummaryItemsProps {
    cart: IRecipeCartItem[];
    summary: SummaryType;
}
interface ISummaryProps {
    setUser: React.Dispatch<SetStateAction<IUser>>;
    cart: IRecipeCartItem[];
    setOrderPlaced: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOrderStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IOrderStatusProps {
    orderPlaced: boolean;
    setShowOrderStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext({} as IUserContext);

const CheckoutDisplayOrders: React.FC<{ setUser: React.Dispatch<SetStateAction<IUser>> }> = ({ setUser }) => {
    const { user, cart } = useContext(UserContext);

    const updateItemCount = (item: IRecipeCartItem, add: number) => {
        tryCatch(async () => {
            let newCount = item.count + add;
            // let newCart = new ArrayExtension(...cart);
            let newCart = [...cart];
            if (newCount < 1) {
                newCount = 0;
                const index = newCart.indexOf(item);
                // newCart = newCart.remove(index);
                newCart.splice(index, 1);
            } else {
                newCart = [...cart];
                // newCart = new ArrayExtension(...cart);
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





const OrderSummaryItems: React.FC<ISummaryItemsProps> = ({ cart, summary: { totalBeforeTax, cleanUpService, serviceFee } }) => {
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



const CheckoutDisplaySummary: React.FC<ISummaryProps> = ({ setUser, cart, setOrderPlaced, setShowOrderStatus }) => {
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



const OrderStatus: React.FC<IOrderStatusProps> = ({ orderPlaced, setShowOrderStatus }) => {
    const [message, setMessage] = useState({
        title: '',
        message: '',
    });

    const navigate = useNavigate();

    const handleClose = (e: SyntheticEvent) => {
        setShowOrderStatus(false);
        navigate('/home');
    };

    useEffect(() => {
        if (orderPlaced) {
            setMessage({ title: 'Order Placed', message: 'Your order has been placed and is being processed. You will receive a confirmation email shortly.' });
        } else {
            setMessage({ title: 'Order Not Placed', message: 'Your order was not placed. Please try again.' });
        }
    }, [orderPlaced]);

    return (
        <div className='order-status-display' onClick={handleClose}>
            <Card className='order-status-card'>
                <h3>{message.title}</h3>
                <p>{message.message}</p>
            </Card>
        </div>
    )
}

const CheckoutScreen: React.FC<INavLinks> = ({ navLinks }) => {
    const [user, setUser] = useState({} as IUser);
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
                    <NavBar user={user} setUser={setUser} />
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