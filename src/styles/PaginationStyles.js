import { Link } from 'gatsby';
import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviousPage = styled(Link)`
  display: inline-block;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;

  &:hover {
      background-color: #0056b3;
      color: #fff;
    }
`;

export const NextPage = styled(Link)`
  display: inline-block;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0;
  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;

  &:hover {
      background-color: #0056b3;
      color: #fff;
    }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &&.active {
    color: #fff;
    background-color: #0056b3;
  }

  &:hover {
    color: #fff;
    background-color: #0056b3;
  }
`;

export const PaginationList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;

  li {
    display: inline-block;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0;
    cursor: pointer;
    color: #333;
    transition: background-color 0.3s, color 0.3s;

    &.active, &:hover {
      background-color: #0056b3;
      color: #fff;
    }
  }
`;