import React from 'react';
import { AnimeCardContainer, AnimeTitle } from '../styles/SingleAnimeComponentStyles';
import { GatsbyImage } from 'gatsby-plugin-image';
import { findImageByName } from '../utils/findImageByName';

const SingleAnimeCard = ({ data, imagesData }) => {
  const { id, title } = data;

  const coverImage = findImageByName(`cover_${id}`, imagesData);

  return (
    <AnimeCardContainer>
      <GatsbyImage image={coverImage} alt={title.userPreferred} />
      <AnimeTitle>{title.userPreferred}</AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
