import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';


import { tryCatch } from '../helper/util';
import { searchResultsOnClickContext } from '../context/searchResultContext';
import { orderContext } from '../context/orderContext';

import Avatar from './avatar';
import SearchBar from './search/searchBar';
import SearchResults from './search/searchResults';
import NavBar from './navBar';
import FullChefPreview from './fullChefPreviewCard';

import '../styles/mainScreen.css';
import '../styles/searchResults.css';


const MainScreen = ({ navLinks }) => {
    const [user, setUser] = useState({});
    const [selectedChef, setSelectedChef] = useState({});
    const [overallRating, setOverallRating] = useState(0);

    const [toggleFullChefPreview, setToggleFullChefPreview] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchBarCompleteClassName, setSearchBarCompleteClassName] = useState('');

    const location = useLocation();

    useEffect(() => {
        tryCatch(async () => {
            if (location.state === null) {
                const response = await axios.get('/api/auth/login');
                if (response.data) {
                    setUser(response.data);
                }
            } else {
                setUser(location.state.user);
            }
        })();
    }, []);

    const submitQuery = (e) => {
        e.preventDefault();
        tryCatch(async () => {
            const response = await axios.get(`/api/search?query=${searchQuery}`);
            if (response.data) {
                setSearchResults(response.data);
            } else {
                setSearchResults([]);
            }

            setSearchBarCompleteClassName('on-search-complete');
        })();
    }

    const handleClickOnCard = (chef) => {
        setSelectedChef(chef);
        setToggleFullChefPreview(!toggleFullChefPreview);
        console.log('clicked', chef.userName);
        console.log('reviews', chef.reviews);

        const overallRating = chef.reviews.reduce((acc, curr) => {
            return acc + curr.rating;
        }, 0) / chef.reviews.length;
        setOverallRating(overallRating);
    }

    // The product is being ordered by the user.
    // The server-side controller needs to know the user that placed the order.
    // The chef that makes the product.
    // And the product itself.

    const onOrderProduct = (chef, product) => {
        console.log('order product', product);
        tryCatch(async () => {
            const response = await axios.post('/api/cart', {
                item: product,
                user: user,
                chef: chef,
            });
            if (response.data) {
                console.log('order product response', response.data);
            }
        })();
    }

    return (
        <>
            {toggleFullChefPreview ?
                <orderContext.Provider value={{ onOrderProduct }}>
                    <FullChefPreview chef={selectedChef} overallRating={overallRating} handleClickOnCard={handleClickOnCard} />
                </orderContext.Provider>
                : null}
            <div className='main-screen'>
                <div className="main-screen-header" />
                <div className="main-screen-body">
                    <NavBar user={user} />
                    <Avatar user={user} navLinks={navLinks} />
                    <SearchBar className={searchBarCompleteClassName} searchQuery={searchQuery} setSearchQuery={setSearchQuery} submitQuery={submitQuery} />
                    <searchResultsOnClickContext.Provider value={{ handleClickOnCard }}>
                        {searchResults && searchResults.length > 0 && <SearchResults user={user} searchResults={searchResults} />}
                    </searchResultsOnClickContext.Provider>
                </div>
            </div>
        </>
    )
}

export default MainScreen