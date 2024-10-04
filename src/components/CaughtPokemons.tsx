import { useCaughtPokemons } from '@hooks/useCaughtPokemons'
import { Link } from 'react-router-dom'

function CaughtPokemonsPage() {
  const { caughtPokemons } = useCaughtPokemons()

  return (
    <>
      <h1>Caught Pokémon</h1>
      <Link to="/">Back to Pokémon List</Link>
      <div className="pokemon-list">
        {caughtPokemons.map(({ name, sprites }, index) => (
          <div key={`${name}-${index}`} className="pokemon-item">
            <img src={sprites.front_default} alt={name} />
            <p>{name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default CaughtPokemonsPage
