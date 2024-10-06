import { usePokemons } from '../hooks/usePokemons'
import { PokemonList } from './PokemonList'

const Pokemons = () => {
  const { handleIsCaught, handleCatch, pokemonDetails, isLoading } =
    usePokemons()

  return (
    <>
      <h1>Pokémon List</h1>
      <PokemonList
        pokemonList={pokemonDetails}
        handleIsCaught={handleIsCaught}
        handleCatch={handleCatch}
      />
      {isLoading && <p>Loading...</p>}
    </>
  )
}

export default Pokemons
