const { getRandomInt } = require('../helper/util');

const testRecipes = [
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
        price: getRandomInt(10, 20),
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
        price: getRandomInt(10, 20),
        image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
    },
    {
        name: "Chicken Alfredo",
        ingredients: [
            "Chicken",
            "Salt",
            "Pepper",
            "Garlic",
            "Onion",
            "Parmesan",
            "Olive Oil",
        ],
        price: getRandomInt(10, 20),
        image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
    },
    {
        name: "Chicken Parmesan",
        ingredients: [
            "Chicken",
            "Salt",
            "Pepper",
            "Garlic",
            "Onion",
            "Parmesan",
            "Olive Oil",
        ],
    },
    {
        name: "Pepper Steak w/ Pasta",
        ingredients: [
            "Steak",
            "Salt",
            "Pepper",
            "Garlic",
            "Onion",
            "Spaghetti",
        ],
        price: getRandomInt(10, 20),
        image: "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/grilled-chicken-soup.jpg?itok=_ZjQ-_qB",
    },
]

const testSpecialties = [
    "Chicken",
    "Steak",
    "Pasta",
    "Pizza",
    "Soup",
    "Salad",
    "Sandwich",
    "Burger",
    "Wrap",
    "Dessert",
    "Drink",
    "Dessert",
]

module.exports = { testRecipes, testSpecialties }