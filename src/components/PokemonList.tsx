import React from 'react'
import PokemonDetail from './PokemonDetail'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { PokemonCard } from './PokemonCard'
import { IPokemonDetail } from '@/services/InterfacePokeApiClient'

interface IPokemonListProps {
  pokemonList: IPokemonDetail[]
  handleIsCaught?: (name: string) => boolean
  handleCatch?: (name: string) => void
}

export const PokemonList = ({
  pokemonList,
  handleIsCaught,
  handleCatch,
}: IPokemonListProps) => {
  const { handleSelectPokemon, handleCloseDetail, selectedPokemon } =
    usePokemonDetails(pokemonList)

  return (
    <>
      <div className="wrapper" style={{ display: 'flex' }}>
        <div
          className="pokemon-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '20px',
          }}
        >
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              handleSelectPokemon={handleSelectPokemon}
              handleIsCaught={handleIsCaught}
              handleCatch={handleCatch}
            />
          ))}
        </div>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </>
  )
}
