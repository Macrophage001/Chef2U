import React, { useState, useEffect, SyntheticEvent } from 'react'
import { useLocation } from 'react-router-dom';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import axios from 'axios';

import { tryCatch } from '../../helper/util';
import { SearchResultsContext } from '../../context/searchResultsContext';
import { OrderContext } from '../../context/orderContext';
import { tryAddToStorage } from '../../helper/storageHelper';
import { IUser } from '../../interfaces/IUser';
import { INavLinks } from '../../interfaces/INavLinks';

import Avatar from '../ui/avatar';
import SearchBar from '../search/searchBar';
import SearchResults from '../search/searchResults';
import NavBar from '../navBar';
import FullChefPreview from '../ui/fullChefPreviewCard';

import '../../styles/mainScreen.css';
import '../../styles/searchResults.css';

const MainScreen: React.FC<INavLinks> = ({ navLinks }) => {
    const [user, setUser] = useState({} as IUser);
    const [selectedChef, setSelectedChef] = useState({} as IUser);
    const [overallRating, setOverallRating] = useState(0);

    const [toggleFullChefPreview, setToggleFullChefPreview] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [searchBarCompleteClassName, setSearchBarCompleteClassName] = useState('');
    const [mainScreenClassName, setMainScreenClassName] = useState('');

    const loggedInUser = useLoggedInUser(useLocation());
    useEffect(() => {
        setUser(loggedInUser);
    }, [loggedInUser]);
    useEffect(() => {
        tryAddToStorage('session', 'user', user);
    }, [user]);

    useEffect(() => {
        if (toggleFullChefPreview) {
            document.body.style.overflow = 'hidden';
            setMainScreenClassName('blur-screen');
        } else {
            document.body.style.overflow = 'auto';
            setMainScreenClassName('');
        }
    }, [toggleFullChefPreview]);

    const submitQuery = (e: SyntheticEvent) => {
        e.preventDefault();
        tryCatch(async () => {
            const response = await axios.get(`/api/search?query=${searchQuery}&userId=${user._id}`);
            if (response.data) {
                setSearchResults(response.data);
            } else {
                setSearchResults([]);
            }

            setSearchBarCompleteClassName('on-search-complete');
        })();
    }

    const handleClickOnCard = (chef: IUser) => {
        console.log("Toggle Full Chef Preview", toggleFullChefPreview);

        setSelectedChef(chef);
        setToggleFullChefPreview(!toggleFullChefPreview);

        console.log("clicked on card", toggleFullChefPreview);

        const overallRating = chef.reviews.reduce((acc, curr) => {
            return acc + curr.rating;
        }, 0) / chef.reviews.length;
        setOverallRating(overallRating);
    }

    return (
        <>
            {toggleFullChefPreview ?
                <OrderContext.Provider value={{ user, setUser }}>
                    <FullChefPreview chef={selectedChef} handleClickOnCard={handleClickOnCard} overallRating={overallRating} />
                </OrderContext.Provider>
                : null}
            <div className={`main-screen ${mainScreenClassName}`}>
                <div className="main-screen-header" />
                <div className="main-screen-body">
                    <NavBar user={user} setUser={setUser} />
                    <Avatar navLinks={navLinks} />
                    <SearchBar className={searchBarCompleteClassName} searchQuery={searchQuery} setSearchQuery={setSearchQuery} submitQuery={submitQuery} />
                    <SearchResultsContext.Provider value={{ handleClickOnCard }}>
                        {searchResults && searchResults.length > 0 && <SearchResults searchResults={searchResults} />}
                    </SearchResultsContext.Provider>
                </div>
            </div>
        </>
    )
}

export default MainScreen