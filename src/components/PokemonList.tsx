import PokemonDetail from './PokemonDetail'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { PokemonCard } from './PokemonCard'
import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import '../css/PokemonList.css'
interface IPokemonListProps {
  pokemonList: IPokemonDetail[]
  handleIsCaught?: (name: string) => boolean
  handleCatch?: (name: string) => void
  togglePokemonToRemove?: (name: string) => void
  pokemonsToRemove?: string[]
  removeSelectedPokemons?: () => void
}

export const PokemonList = ({
  pokemonList,
  handleIsCaught,
  handleCatch,
  togglePokemonToRemove,
  pokemonsToRemove,
  removeSelectedPokemons,
}: IPokemonListProps) => {
  const { handleSelectPokemon, handleCloseDetail, selectedPokemon } =
    usePokemonDetails(pokemonList)

  return (
    <>
      {pokemonsToRemove && pokemonsToRemove.length > 0 && (
        <button onClick={removeSelectedPokemons}>
          Remove Selected Pokémons
        </button>
      )}
      <div className="wrapper" style={{ display: 'flex' }}>
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemon={pokemon}
              handleSelectPokemon={handleSelectPokemon}
              handleIsCaught={handleIsCaught}
              handleCatch={handleCatch}
              togglePokemonToRemove={togglePokemonToRemove}
              pokemonsToRemove={pokemonsToRemove}
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
