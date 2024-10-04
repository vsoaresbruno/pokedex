import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import React from 'react'

interface PokemonDetailProps {
  pokemon: IPokemonDetail | null
  onClose: () => void
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onClose }) => {
  if (!pokemon) return null

  return (
    <div className="pokemon-detail">
      <button onClick={onClose}>Close</button>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h3>Types</h3>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonDetail
