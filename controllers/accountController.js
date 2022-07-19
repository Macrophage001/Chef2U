const fs = require('fs');
const { tryCatch } = require('../helper/util');
const { User } = require('../models/userModel');

const uploadToDB = (req, res) => {
    tryCatch(async () => {
        const img = fs.readFileSync(req.file.path);
        const encodedImage = Buffer.from(img, 'base64');

        const encodedImageData = {
            data: encodedImage,
            contentType: req.file.mimetype,
            name: "",
            description: "",
            title: "",
            date: "",
        };

        const updatedUser = await User.findByIdAndUpdate(req.query.userId, { avatar: encodedImageData }, { new: true });
        res.send(updatedUser);
    })();
}

const updateAccount = (req, res) => {
    tryCatch(async () => {
        console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(req.query.userId, req.body, { new: true });
        res.send(updatedUser);
    })();
}

const getProfilePicture = (req, res) => {
    tryCatch(async () => {
        const user = await User.findById(req.query.userId);
        if (user.avatar.data) {
            res.send(user.avatar);
        }
    })();
}

module.exports = {
    uploadToDB,
    getProfilePicture,
    updateAccount,
}
