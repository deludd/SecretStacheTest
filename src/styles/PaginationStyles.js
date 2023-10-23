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
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 0 10px;
  height: 100%;
  line-height: inherit;

  &.active,
  &:hover {
    color: #fff;
  }
`;

export const PaginationUl = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;
`;

export const PaginationLi = styled.li`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: #333;
  transition:
    background-color 0.3s,
    color 0.3s;

  &.active {
    background-color: #0056b3;
    color: #fff;

    &:hover {
      background-color: #007bff;
    }
  }

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }

  &:last-child {
    margin-right: 0;
  }
`;
