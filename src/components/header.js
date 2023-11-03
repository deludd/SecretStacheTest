import lunr from 'lunr';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { HeaderWrapper, NavItem, NavList, Logo, HeaderContainer } from '../styles/HeaderStyles';

import Search from './search';

const Header = () => {
  const [index, setIndex] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchSearchIndex = async () => {
      const response = await fetch('/searchIndex.json');
      const data = await response.json();
      setIndex(lunr.Index.load(data.index));
      setAllData(data.allAnime);
    };
    fetchSearchIndex();
  }, []);

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
            <Search index={index} allData={allData} />
          </NavItem>
        </NavList>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
