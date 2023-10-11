import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import SingleAnimeCard from '../components/singleAnimeCard';
import Pagination from '../components/paginationBar';

import {
  AnimeGrid,
  AnimeCardContainer,
  AnimeFilters,
  AnimeFilterItem,
  AnimeFilterLink,
} from '../styles/AnimePageStyles';

const Anime = ({ data, pageContext, errors }) => {
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
      name: 'Chapters',
      value: 'chapters',
    },
    {
      name: 'Popularity',
      value: 'popularity',
    },
    {
      name: 'Views',
      value: 'views',
    },
  ];

  if (errors) {
    console.error(errors);
    return null; 
  }

  return (
    <Layout>
      <Seo title="Anime" />
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
      <Pagination
        currentPage={currentPage}
        filter={currentFilter}
        numPages={numPages}
        basePath={basePath}
      />
    </Layout>
  );
};

export default Anime;

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!, $sort: [ANILIST_MediaSort], $id_in: [Int]) {
    anilist {
      Page(page: $skip, perPage: $limit) {
        media(type: ANIME, sort: $sort, id_in: $id_in) {
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
