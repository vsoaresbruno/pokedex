import { useSharePokemon } from '@/hooks/useSharePokemon'
import '../css/PokemonCard.css'
interface IPokemonCard {
  pokemon: {
    name: string
    pokemonDetails: {
      id: number
      name: string
      sprites: { front_default: string }
      note?: string
    }
  }
  handleSelectPokemon: (name: string) => void
  handleCatch?: (name: string) => void
  togglePokemonToRemove?: (name: string) => void
  updateNote?: (name: string, note: string) => void
  pokemonsToRemove?: string[]
  IsCaught?: boolean
}

export const PokemonCard = ({
  pokemon,
  handleSelectPokemon,
  handleCatch,
  togglePokemonToRemove,
  updateNote,
  pokemonsToRemove,
  IsCaught,
}: IPokemonCard) => {
  const { handleShare } = useSharePokemon(pokemon)
  const { sprites, name, id, note } = pokemon.pokemonDetails

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
        {handleCatch ? (
          <>
            <button
              onClick={() => (IsCaught ? null : handleCatch(name))}
              disabled={IsCaught}
            >
              Catch
            </button>
          </>
        ) : (
          <textarea
            value={note}
            onChange={(e) => updateNote && updateNote(name, e.target.value)}
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
