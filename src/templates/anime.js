import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
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

const Anime = ({ pageContext }) => {
  const { currentPage, totalPages, currentFilter, animeTitles } = pageContext;
  const [animeList, setAnimeList] = useState(animeTitles);
  const basePath = '/anime';

  useEffect(() => {
    if (typeof window !== 'undefined' && animeTitles) {
      localStorage.setItem('animeTitles', JSON.stringify(animeTitles));
    }
  }, [animeTitles]);

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

  useEffect(() => {
    setAnimeList(sortByCriteria(animeTitles, currentFilter));
  }, [animeTitles, currentFilter, sortByCriteria, currentPage]);

  return (
    <Layout>
      <Seo title="Anime" />
      <AnimeFilters>
        {filters.map(({ name, value }) => (
          <AnimeFilterItem key={value}>
            <AnimeFilterLink
              onClick={() => setAnimeList(sortByCriteria(animeTitles, value))}
              to={`${basePath}/${value}/page=${currentPage}`}
            >
              {name}
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
      <Pagination currentPage={currentPage} filter={currentFilter} numPages={totalPages} basePath={basePath} />
    </Layout>
  );
};

export default Anime;
