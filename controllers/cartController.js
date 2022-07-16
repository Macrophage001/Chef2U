const { User } = require('../models/userModel');
const { tryCatch } = require('../helper/util');

const updateCart = (req, res) => {
    tryCatch(async () => {
        const { userId, newCart } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { cart: newCart } }, { new: true });
        // console.log("Updated Cart in DB: ", updatedUser.cart);
        res.send(updatedUser);
    })();
}

const addToCart = (req, res) => {
    tryCatch(async () => {
        const { item, user, chef } = req.body;
        const cartItem = {
            ...item,
            chefId: chef.chefId,
            chefName: `${chef.firstName} ${chef.lastName}`,
            count: 1,
        }
        const oldUser = await User.findById(user.userId);
        const { cart } = oldUser;
        if (cart.find(item => item.name === cartItem.name && item.chefId === cartItem.chefId)) {
            const index = cart.findIndex(item => item.name === cartItem.name);
            cart[index].count++;
        } else {
            cart.push(cartItem);
        }
        const updatedUser = await User.findByIdAndUpdate(user.userId, { $set: { cart } }, { new: true });
        res.send(updatedUser);
    })();
}

/**
 * @description - Thinking about implementing Stripe to handle the processing of the funds.
 * @param {*} req 
 * @param {*} res 
 */
const placeOrder = (req, res) => {
    tryCatch(async () => {
        console.log("Place Order Request: ", req.body);

        const { userId } = req.body;
        const user = await User.findById(userId);
        const { cart, orderHistory } = user;

        const todaysDate = new Date();
        const todaysDataString = `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`;

        const newOrderHistory = cart.map(item => {
            return {
                ...item,
                dateOrdered: todaysDataString,
            }
        });

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: { cart: [], orderHistory: [...orderHistory, ...newOrderHistory] } }, { new: true });
        res.send({ updatedUser, orderPlaced: true });
    }, err => {
        console.log("Error in placeOrder: ", err);
        res.send({ updatedUser: {}, orderPlaced: false });
    })();
}

const getArtistImages = (req, res) => {
    tryCatch(async () => {
        const { userId } = req.body;
        const user = await User.findById(userId);
        // const { images } = user;
        res.send(user.images);
    })();
}

module.exports = { updateCart, addToCart, placeOrder };