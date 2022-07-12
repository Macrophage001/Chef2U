const { tryCatch } = require('../helper/util');
const { User } = require('../models/userModel');

const getSearchResults = (req, res) => {
    tryCatch(async () => {
        const matchingChefs = await User.find({
            isChef: true,
            $or: [
                { specialties: { $regex: req.query.query } },
                { recipes: { $elemMatch: { name: { $regex: req.query.query } } } },
            ]
        });
        res.send(matchingChefs.filter(chef => chef._id.toString() !== req.query.userId));
    })();
}

module.exports = { getSearchResults };