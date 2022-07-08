import React from 'react'

const SearchBar = ({ className, searchQuery, setSearchQuery, submitQuery }) => (
    <form onSubmit={submitQuery} className={`search-bar ${className}`}>
        <input type="text" name='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='What are you in the mood for...?' />
        <img className='search-icon' src="\images\search.png" alt='search_icon' />
        <input type="submit" value="Submit" style={{ display: 'none' }} />
    </form>
)

export default SearchBar