const router = require('express').Router();

const { updateCart, addToCart } = require('../controllers/cartController');

router.route('/')
    .post(addToCart);
router.route('/update')
    .put(updateCart)

module.exports = router;
