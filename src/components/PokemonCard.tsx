import { useSharePokemon } from '@/hooks/useSharePokemon'
import '../css/PokemonCard.css'
import { Button } from './shared/Button/Button'
import { Checkebox } from './shared/Checkbox/Checkbox'
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
        {!handleCatch && (
          <textarea
            className="pokemon-card__note"
            value={note}
            onChange={(e) => updateNote && updateNote(name, e.target.value)}
            placeholder="Add a note"
          />
        )}
        <div className="pokemon-card__actions">
          {handleCatch && (
            <Button
              onClick={() => handleCatch(name)}
              disabled={IsCaught}
              variant="primary"
            >
              {IsCaught ? 'Caught' : 'Catch'}
            </Button>
          )}

          {togglePokemonToRemove && pokemonsToRemove && (
            <Checkebox
              checked={pokemonsToRemove.includes(pokemon.name)}
              onChange={() => togglePokemonToRemove(pokemon.name)}
            />
          )}
        </div>
        <div className="pokemon-card__actions">
          <Button onClick={handleShare} variant="secondary">
            Share
          </Button>
        </div>
      </div>
    </>
  )
}
