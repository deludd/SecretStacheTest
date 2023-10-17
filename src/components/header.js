import React, { useState } from 'react';
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

const Header = ({ allAnimeData }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    if (query) {
      const results = allAnimeData.Page.media.filter((anime) =>
        anime.title.romaji.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <NavList>
            <NavItem>
              <Logo className="title">
                <Link to="/" className="navLink">
                  AnimeStache
                </Link>
              </Logo>
            </NavItem>
            <NavItem>
              <SearchInput type="text" value={searchValue} onChange={handleInputChange} placeholder="Search anime..." />
              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.slice(0, 5).map((result) => (
                    <SearchLink to={`/anime/id=${result.id}`} key={result.id}>
                      <SearchResultItem>{result.title.romaji}</SearchResultItem>
                    </SearchLink>
                  ))}
                </SearchResults>
              )}
            </NavItem>
          </NavList>
        </HeaderContainer>
      </HeaderWrapper>
    </>
  );
};

export default Header;
