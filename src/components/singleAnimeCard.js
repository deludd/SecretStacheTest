import React from 'react';
import { getImage } from 'gatsby-plugin-image';
import { GatsbyImage } from 'gatsby-plugin-image';
import { AnimeCardContainer, AnimeTitle } from '../styles/SingleAnimeComponentStyles';

const SingleAnimeCard = ({ data: { title, coverImage } }) => {
  const imageAvatar = getImage(coverImage.largeSharp.childImageSharp.gatsbyImageData);

  return (
    <AnimeCardContainer>
      <GatsbyImage image={imageAvatar} alt={title.userPreferred} />
      <AnimeTitle>{title.userPreferred}</AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
