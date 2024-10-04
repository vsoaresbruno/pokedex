import { usePokemons } from '../hooks/usePokemons'
import { Link } from 'react-router-dom'

const Pokemons = () => {
  const { handleIsCaught, handleCatch, pokemonDetails, isLoading } =
    usePokemons()

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
              <img src={sprites.front_default} alt={name} />
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
      </div>
      {isLoading && <p>Loading...</p>}
    </>
  )
}

export default Pokemons
