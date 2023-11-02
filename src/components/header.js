import lunr from 'lunr';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import {
  HeaderWrapper,
  NavItem,
  NavList,
  Logo,
  SearchInput,
  SearchResults,
  SearchResultItem,
  SearchLink,
  HeaderContainer,
} from '../styles/HeaderStyles';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [index, setIndex] = useState(null);
  const [allData, setAllData] = useState([]);
  const [results, setResults] = useState([]);

  const fetchSearchIndex = async () => {
    const response = await fetch('/searchIndex.json');
    const data = await response.json();
    setIndex(lunr.Index.load(data.index));
    setAllData(data.allAnime);
  };

  useEffect(() => {
    fetchSearchIndex();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (index) {
      const searchResults = index.search(`${value}*`);
      setResults(searchResults);
    }
  };

  const renderSearchResults = () => {
    return results.slice(0, 5).map((result, id) => {
      const matchedAnime = allData.find((anime) => String(anime.id) === String(result.ref));
      if (!matchedAnime) return null;
      return (
        <SearchLink to={`/anime/id=${matchedAnime.id}`} key={id}>
          <SearchResultItem>{matchedAnime.title.userPreferred}</SearchResultItem>
        </SearchLink>
      );
    });
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <NavList>
          <NavItem>
            <Link to="/">
              <Logo>AnimeStache</Logo>
            </Link>
          </NavItem>
          <NavItem>
            <SearchInput
              type="text"
              id="search-input"
              name="search"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search anime..."
            />
            {results && results.length > 0 && <SearchResults>{renderSearchResults()}</SearchResults>}
          </NavItem>
        </NavList>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
