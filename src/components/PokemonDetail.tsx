import React from 'react'
import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { TYPE_COLORS } from '@/utils/constants'
import '../css/PokemonDetail.css'

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
      <button className="pokemon-detail__close" onClick={onClose}>
        X
      </button>
      <img
        className="pokemon-detail__image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <h1 className="pokemon-detail__id">#{pokemon.id}</h1>
      <h2 className="pokemon-detail__title">{pokemon.name}</h2>
      <div className="pokemon-detail__section">
        {pokemon.capturedAt && (
          <div>
            <p className="pokemon-detail__subtitle">Captured at</p>
            <p className="pokemon-detail__text">{pokemonCapturedAt}</p>
          </div>
        )}
      </div>
      <div className="pokemon-detail__section">
        <ul className="pokemon-detail__list-types">
          {pokemon.types.map((type, index) => (
            <li
              key={index}
              className="pokemon-detail__types"
              style={{ backgroundColor: TYPE_COLORS[type.type.name] }}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="pokemon-detail__section">
        <h4>Abilities</h4>
        <div className="pokemon-detail__abilities">
          <div className="pokemon-detail__ability">
            <b className="pokemon-detail__subtitle">Height</b>
            <div className="pokemon-detail__tags ">{pokemon.height / 10}m</div>
          </div>
          <div className="pokemon-detail__ability">
            <b className="pokemon-detail__subtitle">Weight</b>
            <div className="pokemon-detail__tags ">{pokemon.weight / 10}kg</div>
          </div>
        </div>
      </div>
      <div className="pokemon-detail__section">
        <h4>Stats</h4>
        <ul className="pokemon-detail__stats">
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PokemonDetail
