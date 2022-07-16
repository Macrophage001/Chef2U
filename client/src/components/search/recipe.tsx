import React from 'react'
import { Recipe } from '../../interfaces/IUser';

interface RecipeProps {
    recipe: Recipe
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
    return (
        <div className="chef-recipe">
            <img src="/images/preview_food.jpg" alt="chef_image" />
            <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>Price: {recipe.price}</p>
            </div>
        </div>
    );
}

export default Recipe