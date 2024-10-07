import { useCaughtPokemons } from '@/hooks/useCaughtPokemons'
import { PokemonList } from './PokemonList'
import { useContext, useState } from 'react'
import { FilterByTypes } from './FilterByTypes'
import { FilterByName } from './FilterByName'
import { PokemonContext } from '@/context/PokemonContext'

function CaughtPokemonsPage() {
  const { caughtPokemonProgress } = useContext(PokemonContext)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const {
    removeSelectedPokemons,
    togglePokemonToRemove,
    pokemonsToRemove,
    filteredPokemons,
    setFilter,
    setSort,
    updateNote,
  } = useCaughtPokemons()

  const handleSort = (sortOption: 'name' | 'height' | 'timestamp' | 'type') => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    setSort(sortOption, newDirection)
  }

  return (
    <>
      <FilterByName setFilter={setFilter} />
      <h1>My Pokedex</h1>
      <p>{caughtPokemonProgress}</p>
      <div>
        <button onClick={() => handleSort('name')}>
          Sort by Name ({sortDirection === 'asc' ? 'Desc' : 'Asc'})
        </button>
        <button onClick={() => handleSort('height')}>Sort by Height</button>
        <button onClick={() => handleSort('timestamp')}>
          Sort by Timestamp
        </button>
        <button onClick={() => handleSort('type')}>Sort by Type</button>
      </div>
      <FilterByTypes setFilter={setFilter} />

      <PokemonList
        pokemonList={filteredPokemons}
        togglePokemonToRemove={togglePokemonToRemove}
        pokemonsToRemove={pokemonsToRemove}
        removeSelectedPokemons={removeSelectedPokemons}
        updateNote={updateNote}
      />
    </>
  )
}

export default CaughtPokemonsPage
