import React from 'react';
import { BASE_PATH } from '../utils/constants.es6';
import { AnimeFilterItem, AnimeFilterLink } from '../styles/AnimePageStyles';
import { filters } from '../utils/constants.es6.js';

const Filters = ({ currentSlug }) => {
  return (
    <>
      {filters.map(({ label, slug, value }) => (
        <AnimeFilterItem key={value}>
          <AnimeFilterLink to={`${BASE_PATH}/${slug}/page=1`} className={currentSlug === slug ? 'activeFilter' : ''}>
            {label}
          </AnimeFilterLink>
        </AnimeFilterItem>
      ))}
    </>
  );
};

export default Filters;
