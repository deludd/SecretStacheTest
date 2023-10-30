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

const Header = ({ currentId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAnimeTitles = localStorage.getItem('animeTitles');
      if (storedAnimeTitles) {
        setAnimeList(JSON.parse(storedAnimeTitles));
      }
    }
  }, []);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchValue(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = animeList.filter(
      (anime) => anime.title.english.toLowerCase().includes(query.toLowerCase()) && anime.id !== currentId,
    );

    setSearchResults(results);
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
            <SearchInput type="text" value={searchValue} onChange={handleInputChange} placeholder="Search anime..." />
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.slice(0, 5).map(({ title, id }) => (
                  <SearchLink to={`/anime/id=${id}`} key={id}>
                    <SearchResultItem>{title.english}</SearchResultItem>
                  </SearchLink>
                ))}
              </SearchResults>
            )}
          </NavItem>
        </NavList>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
