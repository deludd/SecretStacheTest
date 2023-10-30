import React from 'react';
import { getImage } from 'gatsby-plugin-image';
import { GatsbyImage } from 'gatsby-plugin-image';
import { AnimeCardContainer, AnimeTitle } from '../styles/SingleAnimeComponentStyles';

const SingleAnimeCard = ({ data: { title, coverImage } }) => {
  const imageAvatar = getImage(coverImage.largeSharp.childImageSharp.gatsbyImageData);

  return (
    <AnimeCardContainer>
      <GatsbyImage image={imageAvatar} alt={title.english} />
      <AnimeTitle>{title.english ? title.english : title.romaji}</AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
