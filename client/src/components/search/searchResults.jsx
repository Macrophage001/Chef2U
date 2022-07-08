import React, { useContext } from 'react'

import Specialties from './specialties';
import Recipe from './recipe';
import Card from '../card';

import { searchResultsOnClickContext } from '../../context/searchResultContext';

const SearchResults = ({ searchResults, }) => {
    const { handleClickOnCard } = useContext(searchResultsOnClickContext);

    const handleAnimationEnd = (e) => {
        e.target.classList.remove('search-result-fade-in');
    }

    return (
        <div className='search-results'>
            {searchResults.map((chef, index) => {
                return (
                    <Card className='search-result search-result-fade-in' key={index} chef={chef} onClick={() => handleClickOnCard(chef)} onAnimationEnd={handleAnimationEnd}>
                        <img className='chef-image' src={chef.avatar ? `data:image/${chef.avatar.contentType};base64,${chef.avatar.data.toString('base64')}` : "\\images\\chef.png"} alt="avatar" />
                        <h2>{`${chef.firstName} ${chef.lastName}`}</h2>
                        <Specialties chef={chef} />
                        <div className="chef-recipes">
                            {chef.recipes && chef.recipes.map((recipe, index) => <Recipe key={index} recipe={recipe} />)}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default SearchResults