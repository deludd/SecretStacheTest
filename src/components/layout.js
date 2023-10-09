import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import styled from 'styled-components';


const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;

  .main-content {
    margin-top: 20px;
  }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <main className="main-content">
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout
