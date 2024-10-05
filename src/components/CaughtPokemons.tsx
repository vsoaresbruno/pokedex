import { useCaughtPokemons } from '@hooks/useCaughtPokemons'
import { Link } from 'react-router-dom'
import { PokemonList } from './PokemonList'

function CaughtPokemonsPage() {
  const { caughtPokemons } = useCaughtPokemons()

  return (
    <>
      <h1>Caught Pokémon</h1>
      <Link to="/">Back to Pokémon List</Link>
      <PokemonList pokemonList={caughtPokemons} />
    </>
  )
}

export default CaughtPokemonsPage
