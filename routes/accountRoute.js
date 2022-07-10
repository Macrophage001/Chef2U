const router = require('express').Router();
const upload = require('../multer');
const fs = require('fs');

const { User } = require('../models/userModel');

router.route('/profile-picture')
    .post(upload.single('profile-img'), async (req, res) => {
        const img = fs.readFileSync(req.file.path);
        const encodedImage = Buffer.from(img, 'base64');
        console.log("Encoded Image", encodedImage);
        const encodedImageData = {
            data: encodedImage,
            contentType: req.file.mimetype,
        };
        const response = await User.findByIdAndUpdate(req.query.userId, { avatar: encodedImageData }, { new: true });
        res.send(response);
    })
    .get(async (req, res) => {
        let user = {};
        if (req.session.user) {
            user = req.session.user;
        } else {
            user = await User.findById(req.query.userId);
        }
        res.send(`data:${user.avatar.contentType};base64,${Buffer.from(user.avatar.data, 'base64').toString('base64')}`);
    });

module.exports = router;