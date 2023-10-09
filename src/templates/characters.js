import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'
import CharacterCard from '../components/CharacterCard'
import styled from 'styled-components'

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const CharacterCardContainer = styled.div`
  width: 100%;
`;

export default function Characters({ pageContext, data }) {
  const {
    rickandmorty: {
      characters: { results: charactersData, info },
    },
  } = data

  const perPage = 42
  const totalPages = info.pages
  const currentPage = pageContext.page
  const charactersToDisplay = charactersData.slice((currentPage - 1) * perPage, currentPage * perPage);


  const renderNavButtons = () => {
    const previousPage = currentPage - 1
    const nextPage = currentPage + 1

    const pageNumbers = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(i);
      }
    }

    return (
      <div className="nav-buttons">
        <Link to={`/characters/page/${previousPage}`} className={previousPage === 0 ? 'disabledButton' : 'button'}>
          &larr; Previous page
        </Link>
        {pageNumbers.map(pageNumber => (
          <Link
            key={pageNumber}
            to={`/characters/page/${pageNumber}`}
            className={currentPage === pageNumber ? 'currentPageNumber' : 'pageNumber'}
          >
            {pageNumber}
          </Link>
        ))}
        <Link to={`/characters/page/${nextPage}`} className={nextPage > totalPages ? 'disabledButton' : 'button'}>
          Next page &rarr;
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
        <CharacterGrid>
        {charactersToDisplay.map(character => (
          <CharacterCardContainer key={character.id}>
            <Link to={`/characters/page/${currentPage}/${character.id}`}>
              <CharacterCard data={character}/>
            </Link>
          </CharacterCardContainer>
        ))}
        </CharacterGrid>
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

export const pageQuery = graphql`
  query($page: Int!) {
    rickandmorty {
      characters(page: $page) {
        info {
          pages
        }
        results {
          id
          name
          image
          gender
          created
        }
      }
    }
  }
`
