const router = require('express').Router();
const upload = require('../multer');
const { uploadToDB, getProfilePicture } = require('../controllers/accountController');

router.route('/avatar')
    .post(upload.single('profile-img'), uploadToDB)
    .get(getProfilePicture);

module.exports = router;