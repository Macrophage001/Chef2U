const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { tryCatch } = require('../helper/util');

const passwordValidator = {
    bcryptValidator: (hash) => {
        return async (userPassword) => {
            return await bcrypt.compareSync(userPassword, hash);
        }
    }
}

const loginUser = (req, res) => {
    tryCatch(async () => {
        console.log("Log in body: ", req.body);
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            res.status(401).send('Invalid Username or Password {0}');
            return;
        } else {
            const isPasswordCorrect = await passwordValidator.bcryptValidator(user.password)(req.body.password);
            if (!isPasswordCorrect) {
                res.status(401).send('Invalid Username or Password {1}');
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
        // console.log("Logout Query: ", req.query);
        const user = await User.findByIdAndUpdate(req.query.userId, { isLoggedIn: false }, { new: true });
        res.send(user);
    })();
}

const getLoggedInUser = (req, res) => {
    tryCatch(async () => {
        if (req.session.user) {
            res.send(req.session.user);
        } else {
            res.status(401).send('User not logged in');
        }
    })();
}

const signupUser = (req, res) => {
    tryCatch(async () => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(401).send('User already exists');
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