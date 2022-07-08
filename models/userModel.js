const mongooose = require('mongoose');

const RecipesSchema = new mongooose.Schema({
    name: String,
    ingredients: [String],
    steps: [String],
    image: String,
    category: String,
});

const CartItemSchema = new mongooose.Schema({
    item: {
        name: String,
        image: String,
        price: Number,
    },
    quantity: Number,
});

const ReviewSchema = new mongooose.Schema({
    rating: { type: Number, min: 1, max: 5, required: true, default: 5 },
    comment: { type: String, required: true, default: 'No comment' },
    user: String,
});

const UserSchema = new mongooose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    avatar: {
        data: Buffer,
        contentType: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    customerType: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [ReviewSchema],
        default: [
            {
                rating: 5,
                comment: 'No comment',
                user: 'No user'
            },
            {
                rating: 2,
                comment: 'No comment',
                user: 'No user'
            },
            {
                rating: 3,
                comment: 'No comment',
                user: 'No user'
            },
            {
                rating: 4,
                comment: 'No comment',
                user: 'No user'
            },
        ]
    },
    specialties: {
        type: Array,
        default: [
            'american',
            'asian',
            'italian',
        ]
    },
    recipes: {
        type: Array,
        default: [
            {
                name: "Grilled Chicken",
                ingredients: [
                    "Chicken",
                    "Salt",
                    "Pepper",
                    "Garlic",
                    "Onion",
                    "Tomato",
                    "Parsley",
                    "Olive Oil",
                ],
                price: 15.50,
                image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
            },
            {
                name: "Fried Rice",
                ingredients: [
                    "Rice",
                    "Onion",
                    "Tomato",
                    "Parsley",
                    "Olive Oil",
                ],
                price: 11.99,
                image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
            },
        ]
    },
    cart: {
        type: Array,
        default: [
            {
                name: "Grilled Chicken",
                ingredients: [
                    "Chicken",
                    "Salt",
                    "Pepper",
                    "Garlic",
                    "Onion",
                    "Tomato",
                    "Parsley",
                    "Olive Oil",
                ],
                price: 15.50,
                image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
                count: 1
            },
            {
                name: "Fried Rice",
                ingredients: [
                    "Rice",
                    "Onion",
                    "Tomato",
                    "Parsley",
                    "Olive Oil",
                ],
                price: 11.99,
                image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
                count: 2
            },
        ]
    },
    orderHistory: {
        type: Array,
        default: [
            {
                name: "Grilled Chicken",
                ingredients: [
                    "Chicken",
                    "Salt",
                    "Pepper",
                    "Garlic",
                    "Onion",
                    "Tomato",
                    "Parsley",
                    "Olive Oil",
                ],
                price: 15.50,
                image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
            },
            {
                name: "Fried Rice",
                ingredients: [
                    "Rice",
                    "Onion",
                    "Tomato",
                    "Parsley",
                    "Olive Oil",
                ],
                price: 11.99,
                image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
            },
        ]
    }
});

module.exports = { User: mongooose.model('User', UserSchema) };