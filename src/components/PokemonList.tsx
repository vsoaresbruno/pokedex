import { lazy, Suspense } from 'react'
import { IPokemons } from '@/services/InterfacePokeApiClient'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { PokemonCard } from './PokemonCard'
import '../css/PokemonList.css'
interface IPokemonListProps {
  pokemonList: IPokemons[]
  handleIsCaught?: (name: string) => boolean
  handleCatch?: (name: string) => void
  togglePokemonToRemove?: (name: string) => void
  pokemonsToRemove?: string[]
  removeSelectedPokemons?: () => void
  updateNote?: (name: string, note: string) => void
}

export const PokemonList = ({
  pokemonList,
  handleIsCaught,
  handleCatch,
  togglePokemonToRemove,
  pokemonsToRemove,
  removeSelectedPokemons,
  updateNote,
}: IPokemonListProps) => {
  const { handleSelectPokemon, handleCloseDetail, selectedPokemon } =
    usePokemonDetails(pokemonList)

  const AsyncPokemonDetail = lazy(() => import('./PokemonDetail'))
  return (
    <>
      {pokemonsToRemove && pokemonsToRemove.length > 0 && (
        <button onClick={removeSelectedPokemons}>
          Remove Selected Pokémons
        </button>
      )}
      <div className="wrapper">
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              handleSelectPokemon={handleSelectPokemon}
              handleCatch={handleCatch}
              togglePokemonToRemove={togglePokemonToRemove}
              pokemonsToRemove={pokemonsToRemove}
              updateNote={updateNote}
              IsCaught={handleIsCaught ? handleIsCaught(pokemon.name) : false}
            />
          ))}
        </div>
        {selectedPokemon && (
          <Suspense fallback="Loading...">
            <AsyncPokemonDetail
              pokemon={selectedPokemon}
              onClose={handleCloseDetail}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}
