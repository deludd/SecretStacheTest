import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import CharacterCard from '../components/CharacterCard'
import styled from 'styled-components'

// Создайте стилизованный компонент для контейнера карточек персонажей
const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 карточки в ряд */
  gap: 20px; /* Расстояние между карточками */
`;

// Создайте стилизованный компонент для карточки персонажа
const CharacterCardContainer = styled.div`
  /* Стили для карточки персонажа, например, ширина и высота */
  width: 100%; /* Ширина карточки на всю доступную ширину */
`;

const Characters = ({ pageContext, data }) => {
  const {
    rickandmorty: {
      characters: { results: charactersData },
    },
  } = data

  // Добавьте параметры perPage и skip
  const perPage = 6
  const skip = (pageContext.page - 1) * perPage
  const charactersToDisplay = charactersData.slice(skip, skip + perPage)

  const renderCard = () => {
    return charactersToDisplay.map(character => {
      return (
        <CharacterCardContainer key={character.id}>
          <CharacterCard data={character} />
        </CharacterCardContainer>
      )
    })
  }

  const renderNavButtons = () => {
    const previousPage = pageContext.page - 1
    const nextPage = pageContext.page + 1
    console.log(previousPage)

    return (
      <div className="nav-buttons">
        <Link to={`/characters/page/${previousPage}`} disabled={previousPage === 1}>
          Previous
        </Link>
        <span className="page-info">
          Page {pageContext.page} of {pageContext.totalPage}
        </span>
        <Link to={`/characters/page/${nextPage}`} disabled={nextPage > pageContext.totalPage}>
          Next
        </Link>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <>
        <div className="title">
          <h2>Characters</h2>
        </div>
        <CharacterGrid>{renderCard()}</CharacterGrid>
        {renderNavButtons()}
      </>
    )
  }

  return (
    <Layout>
      <Seo title="Characters" />
      {renderContent()}
    </Layout>
  )
}

export default Characters

export const pageQuery = graphql`
  query($page: Int!) {
    rickandmorty {
      characters(page: $page) {
        results {
          id
          name
          image
        }
      }
    }
  }
`
