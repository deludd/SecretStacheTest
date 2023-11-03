import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import SingleAnimeCard from '../components/singleAnimeCard';
import Pagination from '../components/paginationBar';
import { BASE_PATH } from '../utils/constants.es6';
import {
  AnimeGrid,
  AnimeCardContainer,
  AnimeFilters,
  AnimeFilterItem,
  AnimeFilterLink,
} from '../styles/AnimePageStyles';
import { filters } from '../utils/constants.es6.js';

const Anime = ({
  data: {
    anilist: {
      Page: { media: animeList },
    },
    allFile: { nodes: imagesData }
  },
  pageContext,
}) => {
  const { currentPage, totalPages, currentFilter } = pageContext;

  return (
    <Layout>
      <Seo title="Anime" />
      <AnimeFilters>
        {filters.map(({ label, slug, value }) => (
          <AnimeFilterItem key={value}>
            <AnimeFilterLink
              key={value}
              to={`${BASE_PATH}/${slug}/page=1`}
              className={currentFilter.slug === slug ? 'activeFilter' : ''}
            >
              {label}
            </AnimeFilterLink>
          </AnimeFilterItem>
        ))}
      </AnimeFilters>
      <AnimeGrid>
        {animeList.map((anime) => {
          return (
            <Link to={`${BASE_PATH}/id=${anime.id}`} key={anime.id}>
              <AnimeCardContainer key={anime.id}>
                <SingleAnimeCard key={anime.id} data={anime} imagesData={imagesData} />
              </AnimeCardContainer>
            </Link>
          );
        })}
      </AnimeGrid>
      <Pagination currentPage={currentPage} filter={currentFilter.slug} numPages={totalPages} />
    </Layout>
  );
};

export default Anime;

export const pageQuery = graphql`
  query ($currentPage: Int!, $perPage: Int!, $currentFilterValue: ANILIST_MediaSort) {
    anilist {
      Page(page: $currentPage, perPage: $perPage) {
        media(sort: [$currentFilterValue]) {
          id
          title {
            userPreferred
          }
        }
      }
    }
    allFile(filter: { extension: { regex: "/(jpg|jpeg|png)/" }, sourceInstanceName: { eq: "images" } }) {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  }
`;
