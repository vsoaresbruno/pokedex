import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import React from 'react'

interface PokemonDetailProps {
  pokemon: IPokemonDetail | null
  onClose: () => void
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onClose }) => {
  let pokemonCapturedAt
  if (!pokemon) return null

  if (pokemon.capturedAt) {
    const date = new Date(pokemon.capturedAt)
    pokemonCapturedAt = date.toLocaleString()
  }

  return (
    <div className="pokemon-detail">
      <button onClick={onClose}>Close</button>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Captured at: {pokemonCapturedAt}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
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
