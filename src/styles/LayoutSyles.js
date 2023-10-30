import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100vh;

  .main-content {
    margin-top: 20px;
  }
`;

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Bree Serif', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #007bff;
  }

  a:hover {
    color: #0056b3;
  }
`;
