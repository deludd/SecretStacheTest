import React from 'react';

import {AnimeCardContainer, AnimeTitle} from '../styles/SingleAnimeComponentStyles';

const SingleAnimeCard = ({ data: { title, coverImage } }) => {
  return (
    <AnimeCardContainer>
      <img src={coverImage.large} alt={title.romaji} />
      <AnimeTitle>
        <h2>{title.romaji}</h2>
      </AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
