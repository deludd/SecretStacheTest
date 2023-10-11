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

const AnimeFilters = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  margin-top: 20px;
`;

const AnimeFilterItem = styled.li`
  margin: 0 10px;
`;

const AnimeFilterLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Anime = ({ data, pageContext }) => {
  const animeData = data.anilist.Page.media;
  const currentPage = pageContext.currentPage;
  const numPages = pageContext.totalPages;
  const currentFilter = pageContext.currentFilter;
  const basePath = '/anime';

  const filters = [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'По дате выхода',
      value: 'chapters',
    },
    {
      name: 'По рейтингу',
      value: 'popularity',
    },
    {
      name: 'По количеству просмотров',
      value: 'views',
    },
  ];

  console.log(animeData);

  return (
    <Layout>
      <Seo title="Anime" />
      <h1>Anime</h1>

      <AnimeFilters>
        {filters.map((filter) => (
          <AnimeFilterItem key={filter.value}>
            <AnimeFilterLink to={`${basePath}/${filter.value}/page=1`}>
              {filter.name}
            </AnimeFilterLink>
          </AnimeFilterItem>
        ))}
      </AnimeFilters>

      <AnimeGrid>
        {animeData.slice(0, 6).map((anime) => (
          <AnimeCardContainer key={anime.id}>
            <Link to={`${basePath}/id=${anime.id}`}>
              <SingleAnimeCard data={anime} />
            </Link>
          </AnimeCardContainer>
        ))}
      </AnimeGrid>
      <Pagination currentPage={currentPage} filter={currentFilter} numPages={numPages} basePath={basePath} />
    </Layout>
  );
};

export default Anime;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $sort: [ANILIST_MediaSort]) {
    anilist {
      Page(page: $skip, perPage: $limit) {
        media(type: ANIME, sort: $sort) {
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
  }
`;


