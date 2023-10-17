import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import { GlobalStyles, Container } from '../styles/LayoutSyles';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleAndAllAnimeQuery {
      site {
        siteMetadata {
          title
        }
      }
      anilist {
        Page {
          media(type: ANIME) {
            id
            title {
              romaji
            }
          }
        }
      }
      
    }
  `);

  return (
    <>
      <GlobalStyles />
      <Header siteTitle={data.site.siteMetadata.title} allAnimeData={data.anilist} />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
