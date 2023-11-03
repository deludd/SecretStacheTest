import React from 'react';
import { AnimeCardContainer, AnimeTitle } from '../styles/SingleAnimeComponentStyles';

const SingleAnimeCard = ({ data: { title, coverImage } }) => {
  const imageAvatar = coverImage.large;

  return (
    <AnimeCardContainer>
      <img src={imageAvatar} alt={title.userPreferred}/>
      <AnimeTitle>{title.userPreferred}</AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
