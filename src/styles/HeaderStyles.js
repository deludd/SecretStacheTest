import { Link } from 'gatsby';
import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background-color: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;

  .main-content {
    margin-top: 20px;
  }
`;

export const NavList = styled.nav`
  display: flex;
  list-style: none;
  padding-left: 0;
  align-items: center;
  justify-content: space-between;
`;

export const NavItem = styled.div`
  position: relative;
`;

export const Logo = styled.h6`
  font-size: 20px;
  color: #0056b3;

  &:hover {
    color: #007bff;
  }

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #aaa;
    outline: none;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    max-width: 110px;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchLink = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    margin-right: 20px;
  }
`;

export const SearchResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-2px);
    background-color: #f9f9f9;
  }

  a {
    text-decoration: none;
    color: #333;

    &:hover {
    }
  }
`;
