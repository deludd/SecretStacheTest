import styled from 'styled-components';
import { Link } from 'gatsby';

export const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const AnimeCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 350px;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const AnimeFilters = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin: 20px 0;
  padding-left: 0;
`;

export const AnimeFilterItem = styled.li`
  margin: 0 10px;
`;

export const AnimeFilterLink = styled(Link)`
  text-decoration: none;
  color: black;

  &.activeFilter {
    color: #0056b3;

    &:hover {
      color: #007bff;
    }
  }
`;
