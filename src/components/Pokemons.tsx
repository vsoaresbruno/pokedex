import { Link } from 'react-router-dom'
import PokemonDetail from './PokemonDetail'
import { usePokemons } from '../hooks/usePokemons'
import { usePokemonDetails } from '@/hooks/usePokemonDetails'

const Pokemons = () => {
  const { handleIsCaught, handleCatch, pokemonDetails, isLoading } =
    usePokemons()

  const { handleSelectPokemon, handleCloseDetail, selectedPokemon } =
    usePokemonDetails(pokemonDetails)

  return (
    <>
      <h1>Pokémon List</h1>
      <Link to="/caught">Caught Pokémon</Link>
      <div className="wrapper" style={{ display: 'flex' }}>
        <div
          className="pokemon-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '20px',
          }}
        >
          {pokemonDetails.map(({ name, sprites }, index) => (
            <div key={`${name}-${index}`} className="pokemon-item">
              <img
                src={sprites.front_default}
                alt={name}
                onClick={() => handleSelectPokemon(name)}
              />
              <p>{name}</p>
              <button
                onClick={() =>
                  handleIsCaught(name) ? null : handleCatch(name)
                }
              >
                {handleIsCaught(name) ? 'Caught' : 'Catch'}
              </button>
            </div>
          ))}
        </div>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={handleCloseDetail}
          />
        )}
      </div>
      {isLoading && <p>Loading...</p>}
    </>
  )
}

export default Pokemons
