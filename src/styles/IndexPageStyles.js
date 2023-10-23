import styled from 'styled-components';
import { Link } from 'gatsby';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export const Paper = styled.div`
  width: 60%;
  padding: 50px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

export const ButtonGroup = styled.div`
  margin-top: 20px;
`;

export const ExploreButton = styled(Link)`
  display: inline-block;
  padding: 10px 30px;
  font-size: 18px;
  /* background-color: #007bff; */
  background-color: #0056b3;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    background-color: #007bff;
    /* background-color: #0056b3; */
    color: #fff;
  }
`;
