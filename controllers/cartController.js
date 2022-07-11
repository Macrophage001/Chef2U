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
            chefId: chef._id,
            chefName: `${chef.firstName} ${chef.lastName}`,
            count: 1,
        }

        const updatedUser = await User.findById(user);
        const { cart } = updatedUser;
        if (cart.find(item => item.name === cartItem.name && item.chefId === cartItem.chefId)) {
            const index = cart.findIndex(item => item.name === cartItem.name);
            cart[index].count++;
        } else {
            cart.push(cartItem);
        }
        await User.findByIdAndUpdate(user, { $set: { cart } }, { new: true });
        res.send(updatedUser.cart);
    })();
}

module.exports = { updateCart, addToCart };