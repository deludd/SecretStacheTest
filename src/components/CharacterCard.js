import React from 'react'
import { Link } from 'gatsby'

const CharacterCard = ({ data: { id, name, image } }) => {
  return (
    <div className="character-card">
      <Link to={`/characters/id/${id}`} className="character-link">
        <img src={image} alt={name} className="character-image" />
        <div className="character-details">
          <h2 className="character-name">{name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default CharacterCard
