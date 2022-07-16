import React from 'react'

import { IRecipe } from '../../interfaces/IUser';

interface IRecipeProps {
    recipe: IRecipe;
}

const Recipe: React.FC<IRecipeProps> = ({ recipe }) => {
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