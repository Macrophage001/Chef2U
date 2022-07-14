import React, { useState, useContext, useEffect } from 'react'

import Specialties from './specialties';
import Recipe from './recipe';
import Card from '../ui/card';

import { useGetAvatar } from '../../hooks/useGetAvatar';

import { SearchResultsContext } from '../../context/searchResultsContext';

const SearchResult = ({ chef, ...props }) => {
    const [avatar, setAvatar] = useState('');

    const avatarURI = useGetAvatar(chef);

    useEffect(() => {
        setAvatar(avatarURI);
    }, [avatarURI]);

    return (
        <Card className='search-result search-result-fade-in' {...props}>
            <img className='chef-image' src={avatar ? avatar : "\\images\\chef.png"} alt="avatar" />
            <h2>{`${chef.firstName} ${chef.lastName}`}</h2>
            <Specialties chef={chef} />
            <div className="chef-recipes">
                {chef.recipes && chef.recipes.map((recipe, index) => <Recipe key={index} recipe={recipe} />)}
            </div>
        </Card>
    )
}

const SearchResults = ({ searchResults, }) => {
    const { handleClickOnCard } = useContext(SearchResultsContext);

    const handleAnimationEnd = (e) => {
        e.target.classList.remove('search-result-fade-in');
    }

    return (
        <div className='search-results'>
            {searchResults.map((chef, index) => <SearchResult key={index} chef={chef} onClick={() => handleClickOnCard(chef)} onAnimationEnd={handleAnimationEnd} />)}
        </div>
    )
}

export default SearchResults