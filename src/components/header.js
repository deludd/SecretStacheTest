import React from 'react'
import { Link } from 'gatsby'

import { HeaderWrapper, NavItem, NavList,Logo } from '../styles/HeaderStyles'

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <NavList>
          <NavItem>
            <Logo className="title">
              <Link to="/" className="navLink">
                AnimeStache
              </Link>
            </Logo>
          </NavItem>
        </NavList>
      </HeaderWrapper>
    </>
  )
}

export default Header
