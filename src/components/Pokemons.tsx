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
      {/* <div className="wrapper" style={{ display: 'flex' }}>
        <div
          className="pokemon-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '20px',
          }}
        >
          {pokemonDetails.map((pokemon, index) => (
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
      </div> */}

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
