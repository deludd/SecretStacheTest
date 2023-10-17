import React, { useState, useEffect, useCallback } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import SingleAnimeCard from "../components/singleAnimeCard";
import Pagination from "../components/paginationBar";

import {
  AnimeGrid,
  AnimeCardContainer,
  AnimeFilters,
  AnimeFilterItem,
  AnimeFilterLink,
} from "../styles/AnimePageStyles";

const Anime = ({ data, pageContext }) => {
  const initialAnimeData = data.anilist.Page.media;
  const [animeList, setAnimeList] = useState(initialAnimeData);

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
      name: 'Popularity',
      value: 'popularity',
    },
    {
      name: 'Favourites',
      value: 'favourites',
    },
    {
      name: 'Episodes',
      value: 'episodes',
    },
  ];

  const sortByCriteria = (list, criteria) => {
    let sortedList = [...list];
    switch (criteria) {
        case 'popularity':
            return sortedList.sort((a, b) => b.popularity - a.popularity);
        case 'favourites':
            return sortedList.sort((a, b) => b.favourites - a.favourites);
        case 'episodes':
            return sortedList.sort((a, b) => b.episodes - a.episodes);
        default:
            return sortedList;
    }
  };

  const handleSortChange = useCallback((criteria) => {
    const sortedList = sortByCriteria(initialAnimeData, criteria);
    setAnimeList(sortedList);
}, [initialAnimeData]);

  useEffect(() => {
    handleSortChange(currentFilter);
  }, [currentFilter, handleSortChange]);

  return (
    <Layout>
      <Seo title="Anime" />
      <AnimeFilters>
        {filters.map((filter) => (
          <AnimeFilterItem key={filter.value}>
            <AnimeFilterLink onClick={() => handleSortChange(filter.value)} to={`${basePath}/${filter.value}/page=1`}>
              {filter.name}
            </AnimeFilterLink>
          </AnimeFilterItem>
        ))}
      </AnimeFilters>

      <AnimeGrid>
        {animeList.slice(0, 6).map((anime) => (
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
  query($page: Int!, $perPage: Int!) {
    anilist {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME) {
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
          popularity
          favourites
          episodes
        }
      }
    }
  }
`;
