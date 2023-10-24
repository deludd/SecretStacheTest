import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import { GlobalStyles, Container } from '../styles/LayoutSyles';

const Layout = ({ children, currentId }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleAndAllAnimeQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyles />
      <Header siteTitle={data.site.siteMetadata.title} currentId={currentId} />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
