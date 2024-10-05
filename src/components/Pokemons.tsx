import { Link } from 'react-router-dom'
import PokemonDetail from './PokemonDetail'
import { usePokemons } from '../hooks/usePokemons'
import { usePokemonDetails } from '@/hooks/usePokemonDetails'
import { PokemonList } from './PokemonList'

const Pokemons = () => {
  const { handleIsCaught, handleCatch, pokemonDetails, isLoading } =
    usePokemons()

  return (
    <>
      <h1>Pokémon List</h1>
      <Link to="/caught">Caught Pokémon</Link>
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
