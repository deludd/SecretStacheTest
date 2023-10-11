import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header'

import { GlobalStyles, Container } from '../styles/LayoutSyles'

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
      <GlobalStyles />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <main>
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout
