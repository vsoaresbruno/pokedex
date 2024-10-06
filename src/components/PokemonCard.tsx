import '../css/PokemonCard.css'
interface IPokemonCard {
  pokemon: { id: number; name: string; sprites: { front_default: string } }
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
}: IPokemonCard) => {
  const { id, name, sprites } = pokemon

  return (
    <>
      <div key={`${name}`} className="pokemon-card">
        <div
          className="pokemon-card__content"
          onClick={() => handleSelectPokemon(name)}
        >
          <img
            src={sprites.front_default}
            alt={name}
            className="pokemon-card__image"
          />
          <p className="pokemon-card__id">
            <b>#{id}</b>
          </p>
          <p className="pokemon-card__title">{name}</p>
        </div>
        {handleCatch && handleIsCaught && (
          <button
            onClick={() => (handleIsCaught(name) ? null : handleCatch(name))}
            disabled={handleIsCaught(name)}
          >
            Catch
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
    </>
  )
}
