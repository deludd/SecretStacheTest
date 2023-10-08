import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import styled from 'styled-components'; // Импортируйте styled-components

// Создайте стилизованный компонент для вашего Layout
const Container = styled.div`
  max-width: 960px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера по горизонтали */
  padding: 0 20px; /* Внутренний отступ контейнера */

  .main-content {
    margin-top: 20px; /* Отступ между Header и основным контентом */
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
      {/* Используйте стилизованный компонент */}
      <Container>
        <main className="main-content">
          {children}
        </main>
      </Container>
    </>
  )
}

export default Layout
