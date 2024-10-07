import { useContext } from 'react'
import { useCaughtPokemons } from '@/hooks/useCaughtPokemons'
import { PokemonList } from './PokemonList'
import { PokemonContext } from '@/context/PokemonContext'
import { FilterByTypes } from './FilterByTypes'
import { FilterByName } from './FilterByName'
import { SortPokemons } from './SortPokemons'

export const CaughtPokemons = () => {
  const { caughtPokemonProgress } = useContext(PokemonContext)

  const {
    removeSelectedPokemons,
    togglePokemonToRemove,
    pokemonsToRemove,
    sortedPokemons,
    setFilter,
    setSort,
    updateNote,
    sortDirection,
    setSortDirection,
  } = useCaughtPokemons()

  return (
    <>
      <FilterByName setFilter={setFilter} />
      <h1>My Pokedex</h1>
      <p>{caughtPokemonProgress}</p>
      <SortPokemons
        setSort={setSort}
        setSortDirection={setSortDirection}
        sortDirection={sortDirection}
      />
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
