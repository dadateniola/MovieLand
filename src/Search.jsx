import React from "react";

import Searchicon from "./assets/search.png"

const Search = ({ searchTerm, setSearchTerm, searchMovies }) => {
    return (
        <div className="search">
            <input
                type="text"
                value={searchTerm || ''}
                placeholder="Search for movies"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchMovies(searchTerm);
                    }
                }}
            />
            <img
                src={Searchicon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
    )
}

export default Search