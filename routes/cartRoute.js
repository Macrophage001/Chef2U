const router = require('express').Router();

const { updateCart, addToCart, placeOrder } = require('../controllers/cartController');

router.route('/')
    .post(addToCart);
router.route('/update')
    .put(updateCart);
router.route('/placeOrder')
    .post(placeOrder);

module.exports = router;
