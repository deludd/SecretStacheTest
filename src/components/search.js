import React, { useState } from 'react';
import { SearchInput, SearchResults, SearchResultItem, SearchLink } from '../styles/HeaderStyles';

const Search = ({ index, allData }) => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (index) {
      const searchResults = index.search(`${value}*`);
      setResults(searchResults);
    }
  };

  const searchResults = results.slice(0, 5).map((result, id) => {
    const matchedAnime = allData.find((anime) => String(anime.id) === String(result.ref));
    if (!matchedAnime) return null;
    return (
      <SearchLink to={`/anime/id=${matchedAnime.id}`} key={id}>
        <SearchResultItem>{matchedAnime.title.userPreferred}</SearchResultItem>
      </SearchLink>
    );
  });

  return (
    <>
      <SearchInput
        type="text"
        id="search-input"
        name="search"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search anime..."
      />
      {results && results.length > 0 && <SearchResults>{searchResults}</SearchResults>}
    </>
  );
};

export default Search;
