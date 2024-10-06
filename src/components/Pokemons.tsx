import { Link } from 'react-router-dom'
import { usePokemons } from '../hooks/usePokemons'
import { PokemonList } from './PokemonList'

const Pokemons = () => {
  const { handleIsCaught, handleCatch, pokemonDetails, isLoading } =
    usePokemons()

  return (
    <>
      <h1>Pokémon List</h1>
      <Link to="/caught">My Pokedex</Link>
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
