interface Pokemon {
  pokemon: { name: string; sprites: { front_default: string } }
  handleSelectPokemon: (name: string) => void
  handleIsCaught?: (name: string) => boolean
  handleCatch?: (name: string) => void
  togglePokemonToRemove?: (name: string) => void
  pokemonsToRemove?: string[]
}

export const PokemonCard = ({
  pokemon,
  handleSelectPokemon,
  handleIsCaught,
  handleCatch,
  togglePokemonToRemove,
  pokemonsToRemove,
}: Pokemon) => {
  const { name, sprites } = pokemon

  return (
    <div key={`${name}`} className="pokemon-item">
      <img
        src={sprites.front_default}
        alt={name}
        onClick={() => handleSelectPokemon(name)}
      />
      <p>{name}</p>
      {handleCatch && handleIsCaught && (
        <button
          onClick={() => (handleIsCaught(name) ? null : handleCatch(name))}
        >
          {handleIsCaught(name) ? 'Caught' : 'Catch'}
        </button>
      )}
      {togglePokemonToRemove && pokemonsToRemove && (
        <input
          type="checkbox"
          checked={pokemonsToRemove.includes(pokemon.name)}
          onChange={() => togglePokemonToRemove(pokemon.name)}
        />
      )}
    </div>
  )
}
