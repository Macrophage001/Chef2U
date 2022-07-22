const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { tryCatch } = require('../helper/util');

const UserAuthenticationErrors = {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid username or password',
    NOT_LOGGED_IN: 'User not logged in',
    ALREADY_EXISTS: 'User already exists'
}

const passwordValidator = {
    bcryptValidator: (hash) => {
        return async (userPassword) => {
            return await bcrypt.compareSync(userPassword, hash);
        }
    }
}

const loginUser = (req, res) => {
    const { USER_NOT_FOUND, INVALID_CREDENTIALS } = UserAuthenticationErrors;
    tryCatch(async () => {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            res.status(401).send(USER_NOT_FOUND);
            return;
        } else {
            const isPasswordCorrect = await passwordValidator.bcryptValidator(user.password)(req.body.password);
            if (!isPasswordCorrect) {
                res.status(401).send(INVALID_CREDENTIALS);
                return;
            } else {
                req.session.user = user;
                user.isLoggedIn = true;
                await user.save();
                res.send(user);
            }
        }
    })();
}

const logoutUser = (req, res) => {
    tryCatch(async () => {
        req.session.destroy();
        const user = await User.findByIdAndUpdate(req.query.userId, { isLoggedIn: false }, { new: true });
        res.send(user);
    })();
}

const getLoggedInUser = (req, res) => {
    const { NOT_LOGGED_IN } = UserAuthenticationErrors;
    tryCatch(async () => {
        if (req.session.user) {
            res.send(req.session.user);
        } else {
            res.status(401).send(NOT_LOGGED_IN);
        }
    })();
}

const signupUser = (req, res) => {
    const { ALREADY_EXISTS } = UserAuthenticationErrors;
    tryCatch(async () => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(401).send(ALREADY_EXISTS);
            return;
        } else {
            const createdUser = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, saltRounds)
            }
            const newUser = await User.create(createdUser);
            res.send(newUser);
        }
    })();
}

module.exports = { loginUser, logoutUser, getLoggedInUser, signupUser };