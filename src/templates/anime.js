import React, { useState, Fragment, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import SingleAnimeCard from '../components/singleAnimeCard';
import Pagination from '../components/paginationBar';
import LoadingSpinner from '../components/loadingSpinner';
import {
  AnimeGrid,
  AnimeCardContainer,
  AnimeFilters,
  AnimeFilterItem,
  AnimeFilterLink,
} from '../styles/AnimePageStyles';

const filters = [
  {
    label: 'All',
    slug: 'all',
    value: 'ID',
  },
  {
    label: 'Popularity',
    slug: 'popularity',
    value: 'POPULARITY_DESC',
  },
  {
    label: 'Favorites',
    slug: 'favorites',
    value: 'FAVOURITES_DESC',
  },
  {
    label: 'Trending',
    slug: 'trending',
    value: 'TRENDING_DESC',
  },
];

const Anime = ({
  data: {
    anilist: {
      Page: { media: animeList },
    },
  },
  pageContext,
}) => {
  const { currentPage, totalPages, currentFilter } = pageContext;
  const [loading, setLoading] = useState(false);
  const basePath = '/anime';

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [animeList]);

  return (
    <Layout>
      <Seo title="Anime" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <AnimeFilters>
            {filters.map(({ label, slug, value }) => (
              <AnimeFilterItem key={value}>
                <AnimeFilterLink
                  key={value}
                  onClick={() => console.log('click')}
                  to={`${basePath}/${slug}/page=1`}
                  className={currentFilter.slug === slug ? 'activeFilter' : ''}
                >
                  {label}
                </AnimeFilterLink>
              </AnimeFilterItem>
            ))}
          </AnimeFilters>
          <AnimeGrid>
            {animeList.map((anime) => (
              <Link to={`${basePath}/id=${anime.id}`} key={anime.id}>
                <AnimeCardContainer key={anime.id}>
                  <SingleAnimeCard key={anime.id} data={anime} />
                </AnimeCardContainer>
              </Link>
            ))}
          </AnimeGrid>
          <Pagination currentPage={currentPage} filter={currentFilter.slug} numPages={totalPages} basePath={basePath} />
        </Fragment>
      )}
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
          coverImage {
            large
            largeSharp {
              childImageSharp {
                gatsbyImageData(formats: [AUTO, WEBP, AVIF], placeholder: BLURRED, layout: FIXED)
              }
            }
          }
        }
      }
    }
  }
`;
