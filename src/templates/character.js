import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/SEO'

const Character = ({ data }) => {
  const character = data.rickandmorty.character

  return (
    <Layout>
      <Seo title={character.name} />
      <div>
        <h2>{character.name}</h2>
        <button onClick={() => window.history.back()}>Back</button>
        <img src={character.image} alt={character.name} />
        <p>Created: {character.created}</p>
        <p> {character.gender}</p>
      </div>
    </Layout>
  )
}

export default Character

export const pageQuery = graphql`
  query($id: ID!) {
    rickandmorty {
      character(id: $id) {
        id
        name
        image
        created
        gender
      }
    }
  }
`
