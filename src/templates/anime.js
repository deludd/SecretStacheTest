import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Link } from 'gatsby';
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

import {
  getAnimeTitlesFromLocalStorage,
  setAnimeTitlesToLocalStorage,
  isAnimeTitlesUpdated,
} from '../utils/localStorageFunction';

const Anime = ({ pageContext }) => {
  const { currentPage, totalPages, currentFilter, animeTitles: animeTitlesFromContext } = pageContext;
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const basePath = '/anime';

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Popularity', value: 'popularity' },
    { name: 'Favourites', value: 'favourites' },
    { name: 'Episodes', value: 'episodes' },
  ];

  const sortByCriteria = useCallback((list, criteria) => {
    const sortedList = [...list];
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
  }, []);

  const updateAnimeList = useCallback(
    (fullList, filter, page) => {
      const sortedList = sortByCriteria(fullList, filter);
      const start = (page - 1) * 6;
      const end = start + 6;
      return sortedList.slice(start, end);
    },
    [sortByCriteria],
  );

  useEffect(() => {
    setLoading(true);

    const storedAnimeTitles = getAnimeTitlesFromLocalStorage();

    if (!storedAnimeTitles || isAnimeTitlesUpdated()) {
      setAnimeTitlesToLocalStorage(animeTitlesFromContext);
    }

    const fullList = storedAnimeTitles || animeTitlesFromContext;
    setAnimeList(updateAnimeList(fullList, currentFilter, currentPage));
    setLoading(false);
  }, [animeTitlesFromContext, currentFilter, currentPage, updateAnimeList]);

  const handleFilterClick = (filterValue) => {
    const storedAnimeTitles = localStorage.getItem('animeTitles');
    const fullList = JSON.parse(storedAnimeTitles);
    setAnimeList(updateAnimeList(fullList, filterValue, currentPage));
  };

  return (
    <Layout>
      <Seo title="Anime" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <AnimeFilters>
            {filters.map(({ name, value }) => (
              <AnimeFilterItem key={value}>
                <AnimeFilterLink
                  onClick={() => handleFilterClick(value)}
                  to={`${basePath}/${value}/page=${currentPage}`}
                  className={currentFilter === value ? 'activeFilter' : ''}
                >
                  {name}
                </AnimeFilterLink>
              </AnimeFilterItem>
            ))}
          </AnimeFilters>
          <AnimeGrid>
            {animeList.map((anime) => (
              <AnimeCardContainer key={anime.id}>
                <Link to={`${basePath}/id=${anime.id}`}>
                  <SingleAnimeCard data={anime} />
                </Link>
              </AnimeCardContainer>
            ))}
          </AnimeGrid>
          <Pagination currentPage={currentPage} filter={currentFilter} numPages={totalPages} basePath={basePath} />
        </Fragment>
      )}
    </Layout>
  );
};

export default Anime;
