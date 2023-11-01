import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useLunr } from 'react-lunr';
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

  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      allLocalSearchPages {
        nodes {
          store
          index
        }
      }
    }
  `);

  const combinedStore = data.allLocalSearchPages.nodes.reduce((acc, node) => {
    return Object.assign(acc, node.store);
  }, {});

  const combinedIndex = data.allLocalSearchPages.nodes.reduce((acc, node) => {
    return Object.assign(acc, JSON.parse(node.index));
  }, {});

  const searchResults = useLunr(searchValue, combinedIndex, combinedStore);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
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
            {searchResults && searchResults.length > 0 && (
              <SearchResults>
                {searchResults.slice(0, 5).map((result, id) => (
                  <SearchLink to={result.path} key={id}>
                    <SearchResultItem key={id}>{result.userPreferred}</SearchResultItem>
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
