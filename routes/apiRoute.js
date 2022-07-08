const router = require('express').Router();

const searchRoute = require('./searchRoute');
const authRoute = require('./authenticationRoute');
const cartRoute = require('./cartRoute');

router.use('/auth', authRoute);
router.use('/search', searchRoute);
router.use('/cart', cartRoute);

module.exports = router;