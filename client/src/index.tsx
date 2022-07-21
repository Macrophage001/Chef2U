import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import App from './App';
import MainScreen from './components/pages/mainScreen';
import AuthenticationScreen from './components/pages/authenticationScreen';
import AccountScreen from './components/pages/accountScreen';
import Logout from './components/logout';
import CheckoutScreen from './components/pages/checkoutScreen';
import OrderHistoryScreen from './components/pages/orderHistoryScreen';
import AccountDetailsScreen from './components/pages/accountDetailsScreen';

import { NavLink } from './types/navLink';

const avatarNavLinks: NavLink[] = [
  { name: 'Account', link: '/account' },
  { name: 'Orders', link: '/account/orders' },
  { name: 'Cart', link: '/account/cart' },
  { name: 'Logout', link: '/logout' }
];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App navLinks={avatarNavLinks} />} />
        <Route path="/home" element={<MainScreen navLinks={avatarNavLinks} />} />
        <Route path="/account" element={<AccountScreen navLinks={avatarNavLinks} />} />
        <Route path="/orders" element={<OrderHistoryScreen navLinks={avatarNavLinks} />} />
        <Route path="/profile" element={<AccountDetailsScreen navLinks={avatarNavLinks} />} />
        <Route path="/cart" element={<CheckoutScreen navLinks={avatarNavLinks} />} />
        <Route path="/login" element={<AuthenticationScreen />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);