import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/SEO'

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <div className="container">
        <div className="paper">
          <h2 className="title">Rick N Morty</h2>
          <p className="subtitle">
            A <a href="https://www.gatsbyjs.org/">Gatsby</a> Project Powered By{' '}
            <a href="https://rickandmortyapi.com/">Rick And Morty API</a>
          </p>
          <div className="get-started-button-group">
            <a href="/characters/page/1" className="explore-button">
              Explore
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
