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
  const { currentPage, totalPages, currentFilter, animeTitles: animeTitlesFromContext } = pageContext;
  const [animeList, setAnimeList] = useState([]);
  const basePath = '/anime';
  console.log(animeTitlesFromContext.length);

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
    const storedAnimeTitles = typeof window !== 'undefined' ? localStorage.getItem('animeTitles') : null;
    const fullList = storedAnimeTitles ? JSON.parse(storedAnimeTitles) : animeTitlesFromContext;
    if (!storedAnimeTitles) {
      localStorage.setItem('animeTitles', JSON.stringify(animeTitlesFromContext));
    }
    const sortedList = sortByCriteria(fullList, currentFilter);
    const start = (currentPage - 1) * 6;
    const end = start + 6;
    setAnimeList(sortedList.slice(start, end));
  
  }, [animeTitlesFromContext, currentFilter, currentPage, sortByCriteria]);
  
  

  return (
    <Layout>
      <Seo title="Anime" />
      <AnimeFilters>
        {filters.map(({ name, value }) => (
          <AnimeFilterItem key={value}>
            <AnimeFilterLink
              onClick={() => {
                const storedAnimeTitles = localStorage.getItem('animeTitles');
                const fullList = JSON.parse(storedAnimeTitles);
                console.log(fullList);
                setAnimeList(sortByCriteria(fullList, value));
              }}
              to={`${basePath}/${value}/page=${currentPage}`}
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
    </Layout>
  );
};

export default Anime;
