import React from 'react';

const SingleAnimeCard = ({ data: { title, coverImage } }) => {
  return (
    <div>
      <img src={coverImage.large} alt={title.romaji} />
      <div>
        <h2>{title.romaji}</h2>
      </div>
    </div>
  );
};

export default SingleAnimeCard;
