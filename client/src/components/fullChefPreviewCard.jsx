import React, { useContext } from 'react';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Specialties from './search/specialties';
import Button from './button';
import Card from './card';

import { currencyFormat } from '../helper/util';
import { orderContext } from '../context/orderContext';

const RecipeCard = ({ chef, recipe }) => {
    const { onOrderProduct } = useContext(orderContext);

    return (
        <Card className='full-chef-preview-card-recipe-root'>
            <div className="full-chef-preview-card-recipe">
                <img className="full-chef-preview-card-recipe-image" src="\images\preview_food.jpg" alt="food_preview_image" />
                <div className='full-chef-preview-card-recipe-info'>
                    <div className="full-chef-preview-card-recipe-content-left">
                        <div className="full-chef-preview-card-recipe-content-info">
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="full-chef-preview-card-recipe-content-cta">
                            <p>Price: <span>{currencyFormat(recipe.price)}</span></p>
                            <Button onClick={() => onOrderProduct(chef, recipe)} label="Order" />
                        </div>
                    </div>
                    <div className="full-chef-preview-card-recipe-content-right">
                        <h2>Ingredients</h2>
                        <div>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => {
                                    return <li key={index}><p>{ingredient}</p></li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}


const ChefRecipes = ({ chef }) => {
    const { recipes } = chef;
    return (
        <div className="full-chef-preview-card-recipes">
            {recipes.map((recipe, index) => {
                return <RecipeCard key={index} chef={chef} recipe={recipe} />;
            })}
        </div>
    );
}


const FullChefPreview = ({ chef, overallRating, handleClickOnCard }) => {
    const calculateRating = (rating) => {
        let stars = []
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon className='rating-star' key={i} icon={faStar} />);
        }
        if (rating % 1 !== 0) {
            stars.pop();
            stars.push(<FontAwesomeIcon className='rating-star' key={stars.length} icon={faStarHalf} />);
        }
        console.log(stars);
        return stars;
    }

    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClickOnCard(chef);
        }
    }

    return (
        <div className="full-chef-preview" onClick={handleClick}>
            <Card className="full-chef-preview-card">
                <button className='exit-btn' onClick={() => handleClickOnCard(chef)}>&times;</button>

                <div className='full-chef-image'>
                    <img src={chef.avatar ? `data:image/${chef.avatar.contentType};base64,${chef.avatar.data.toString('base64')}` : "\\images\\chef.png"} alt="avatar" />
                </div>
                <div className="full-chef-preview-card-rating">
                    <div className="full-chef-preview-card-rating-stars">
                        {calculateRating(overallRating).map((star, index) => (star))}
                    </div>
                    <div className='full-chef-preview-card-rating-review'>
                        <button>Reviews</button>
                    </div>
                </div>
                <div className="full-chef-preview-card-info">
                    <h2>{chef.firstName} {chef.lastName}</h2>
                    <Specialties chef={chef} />
                    <h2>Years of Experience: {chef.yearsOfExperience} Year(s)</h2>
                </div>
                <ChefRecipes chef={chef} />
            </Card>
        </div>
    )
}

export default FullChefPreview;