const router = require('express').Router();
const { getSearchResults } = require('../controllers/searchController');

router.route('/')
    .get(getSearchResults);

module.exports = router;