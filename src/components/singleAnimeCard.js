import React from 'react';
import { AnimeCardContainer, AnimeTitle } from '../styles/SingleAnimeComponentStyles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import animeData from '../../public/animeData.json';

const SingleAnimeCard = ({ data, imagesData }) => {
  const { id, title } = data;

  const localAnimeData = animeData.find(a => a.id === id);
  if (!localAnimeData) {
    console.error(`No local data found for anime ID: ${id}`);
  }

  const findImageByName = name => {
    const fileNode = imagesData.find(node => node.name === name);
    return fileNode ? getImage(fileNode) : null;
  };

  const coverImage = findImageByName(`cover_${id}`);

  return (
    <AnimeCardContainer>
      <GatsbyImage image={getImage(coverImage)} alt={title.userPreferred}/>
      <AnimeTitle>{title.userPreferred}</AnimeTitle>
    </AnimeCardContainer>
  );
};

export default SingleAnimeCard;
