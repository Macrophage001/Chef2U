const router = require('express').Router();
const upload = require('../multer');
const { uploadToDB, getProfilePicture, updateAccount } = require('../controllers/accountController');

router.route('/avatar')
    .post(upload.single('profile-img'), uploadToDB)
    .get(getProfilePicture);
router.route('/update')
    .post(updateAccount);

module.exports = router;