const router = require('express').Router();

const { loginUser, logoutUser, getLoggedInUser, signupUser } = require('../controllers/authenticationController');

router.route('/login')
    .post(loginUser)
    .get(getLoggedInUser);

router.route('/logout')
    .post(logoutUser);

router.route('/signup')
    .post(signupUser);

module.exports = router;