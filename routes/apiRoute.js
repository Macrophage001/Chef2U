const router = require('express').Router();

const searchRoute = require('./searchRoute');
const authRoute = require('./authenticationRoute');
const cartRoute = require('./cartRoute');
const accountRoute = require('./accountRoute');

router.use('/auth', authRoute);
router.use('/search', searchRoute);
router.use('/cart', cartRoute);
router.use('/account', accountRoute);

module.exports = router;