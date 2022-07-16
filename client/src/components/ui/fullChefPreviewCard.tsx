import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Specialties from '../search/specialties';
import Button from './button';
import Card from './card';

import { currencyFormat } from '../../helper/util';
import { OrderContext } from '../../context/orderContext';
import { useGetAvatar } from '../../hooks/useGetAvatar';
import { tryCatch } from '../../helper/util';
import { IUser } from '../../interfaces/IUser';

const RecipeCard = ({ chef, recipe }) => {
    const { user, setUser } = useContext(OrderContext);

    const onOrderProduct = (chef: IUser, product: any) => {
        tryCatch(async () => {
            const response = await axios.post('/api/cart', {
                item: product,
                user: { userId: user._id },
                chef: { chefId: chef._id, firstName: chef.firstName, lastName: chef.lastName },
            });
            if (response.data) {
                console.log(response.data);
                setUser(response.data);
            }
        })();
    }

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
    const [avatar, setAvatar] = useState('');

    const avatarURI = useGetAvatar(chef);
    useEffect(() => {
        setAvatar(avatarURI);
    }, [chef, avatarURI]);

    const calculateRating = (rating) => {
        let stars: JSX.Element[] = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon className='rating-star' key={i} icon={faStar} />);
        }
        if (rating % 1 !== 0) {
            stars.pop();
            stars.push(<FontAwesomeIcon className='rating-star' key={stars.length} icon={faStarHalf} />);
        }
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
                <div className='full-chef-image' style={avatar ? { backgroundImage: `url(${avatar})` } : { backgroundImage: `url(/images/chef.png)` }} />
                <div className="full-chef-preview-card-rating">
                    <div className="full-chef-preview-card-rating-stars">
                        {calculateRating(overallRating).map(star => star)}
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