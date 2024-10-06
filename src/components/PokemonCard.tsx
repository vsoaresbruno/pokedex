import { useSharePokemon } from '@/hooks/useSharePokemon'
import '../css/PokemonCard.css'
interface IPokemonCard {
  pokemon: {
    id: number
    name: string
    sprites: { front_default: string }
    note?: string
  }
  handleSelectPokemon: (name: string) => void
  handleIsCaught?: (name: string) => boolean
  handleCatch?: (name: string) => void
  togglePokemonToRemove?: (name: string) => void
  updateNote?: (name: string, note: string) => void
  pokemonsToRemove?: string[]
}

export const PokemonCard = ({
  pokemon,
  handleSelectPokemon,
  handleIsCaught,
  handleCatch,
  togglePokemonToRemove,
  updateNote,
  pokemonsToRemove,
}: IPokemonCard) => {
  const { handleShare } = useSharePokemon(pokemon)
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
        {handleCatch && handleIsCaught ? (
          <>
            <button
              onClick={() => (handleIsCaught(name) ? null : handleCatch(name))}
              disabled={handleIsCaught(name)}
            >
              Catch
            </button>
          </>
        ) : (
          <textarea
            value={pokemon.note}
            onChange={(e) =>
              updateNote && updateNote(pokemon.name, e.target.value)
            }
            placeholder="Add a note"
          />
        )}
        <button onClick={handleShare}>Share on WhatsApp</button>

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
