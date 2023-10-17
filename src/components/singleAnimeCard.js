import React from 'react';

import { AnimeCardContainer, AnimeTitle } from '../styles/SingleAnimeComponentStyles';

const SingleAnimeCard = ({ data: { title, coverImage } }) => {
  return (
    <AnimeCardContainer>
      <img src={coverImage.large} alt={title.romaji} />
      <AnimeTitle>{title.romaji}</AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
