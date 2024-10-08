import { useContext } from 'react'
import { useCaughtPokemons } from '@/hooks/useCaughtPokemons'
import { PokemonContext } from '../context/PokemonContext'
import { PokemonList } from './PokemonList'
import { FilterByTypes } from './FilterByTypes'
import { FilterByName } from './FilterByName'
import { SortPokemons } from './SortPokemons'
import '../css/CaughtPokemon.css'

export const CaughtPokemons = () => {
  const { percentageProgress, caughtPokemonCount, totalPokemonCount } =
    useContext(PokemonContext)

  const {
    removeSelectedPokemons,
    togglePokemonToRemove,
    pokemonsToRemove,
    sortedPokemons,
    setFilter,
    setSort,
    updateNote,
    setSortDirection,
  } = useCaughtPokemons()

  return (
    <>
      <div className="caught-pokemon__header">
        <div className="caught-pokemon__title">
          <h1>My Pokedex</h1>
          <p>
            My progress:{' '}
            <b>
              {caughtPokemonCount} of {totalPokemonCount}{' '}
            </b>
            Pokemons - {percentageProgress}%
          </p>
        </div>
        <div className="caught-pokemon__sorting">
          <SortPokemons setSort={setSort} setSortDirection={setSortDirection} />
        </div>
      </div>
      <FilterByName setFilter={setFilter} />

      <FilterByTypes setFilter={setFilter} />

      <PokemonList
        pokemonList={sortedPokemons}
        togglePokemonToRemove={togglePokemonToRemove}
        pokemonsToRemove={pokemonsToRemove}
        removeSelectedPokemons={removeSelectedPokemons}
        updateNote={updateNote}
      />
    </>
  )
}
