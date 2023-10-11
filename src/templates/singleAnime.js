import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/SEO';

const SingleAnime = ({ data }) => {
  const anime = data.anilist.Media;

  console.log(anime);

  return (
    <Layout>
      <Seo title={anime.title.romaji} />
      <div>
        <h2>{anime.title.romaji}</h2>
        <button onClick={() => window.history.back()}>Back</button>
        <img src={anime.coverImage.large} alt={anime.title.romaji} />
        <p>Start Date: {anime.startDate.year}-{anime.startDate.month}-{anime.startDate.day}</p>
        <p>{anime.description}</p>
      </div>
    </Layout>
  );
};

export default SingleAnime;

export const pageQuery = graphql`
  query($id: Int!) {
    anilist {
      Media(id: $id) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        startDate {
          year
          month
          day
        }
        description
      }
    }
  }
`;
