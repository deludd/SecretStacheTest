import React from 'react'

const CharacterCard = ({ data: { name, image } }) => {

  return (
    <div className="character-card">
      <img src={image} alt={name} className="character-image" />
      <div className="character-details">
        <h2 className="character-name">{name}</h2>
      </div>
    </div>
  )
}

export default CharacterCard
