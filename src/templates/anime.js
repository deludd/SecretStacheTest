import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/SEO';
import styled from 'styled-components';
import SingleAnimeCard from '../components/SingleAnimeCard';
import Pagination from '../components/Pagination';

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const AnimeCardContainer = styled.div`
  width: 100%;
`;

const Anime = ({ data, pageContext }) => {
  const animeData = data.anilist.Page.media;
  console.log(animeData)
  const currentPage = pageContext.currentPage;
  const numPages = pageContext.totalPages;
  const basePath = `/anime/page`;

  const animeList = animeData.slice(0, 6);

  return (
    <Layout>
      <Seo title="Anime" />
      <div className="title">
        <h2>Anime</h2>
      </div>
      <AnimeGrid>
        {animeList.map((anime) => (
          <AnimeCardContainer key={anime.id}>
            <Link to={`${basePath}=${currentPage}/anime_id=${anime.id}`}>
              <SingleAnimeCard data={anime} />
            </Link>
          </AnimeCardContainer>
        ))}
      </AnimeGrid>
      <Pagination currentPage={currentPage} numPages={numPages} basePath={basePath} />
    </Layout>
  );
};

export default Anime;

export const pageQuery = graphql`
query AnimePage($skip: Int!) {
  anilist {
    Page(page: $skip, perPage: 6) {
      media(type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
}
`;