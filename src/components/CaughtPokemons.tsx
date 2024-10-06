import { useCaughtPokemons } from '@/hooks/useCaughtPokemons'
import { PokemonList } from './PokemonList'
import { useContext, useState } from 'react'
import { FilterByTypes } from './FilterByTypes'
import { PokemonContext } from '@/context/PokemonContext'

function CaughtPokemonsPage() {
  const { caughtPokemonProgress } = useContext(PokemonContext)

  const {
    removeSelectedPokemons,
    togglePokemonToRemove,
    pokemonsToRemove,
    filteredPokemons,
    setFilter,
    setSort,
    updateNote,
  } = useCaughtPokemons()

  const handleSort = (sortOption: 'name' | 'height' | 'timestamp') => {
    setSort(sortOption)
  }

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSortToggle = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    setSort('name', newDirection)
  }

  return (
    <>
      <h1>My Pokedex</h1>
      <p>{caughtPokemonProgress}</p>
      <div>
        <button onClick={handleSortToggle}>
          Sort by Name ({sortDirection === 'asc' ? 'Desc' : 'Asc'})
        </button>
        <button onClick={() => handleSort('height')}>Sort by Height</button>
        <button onClick={() => handleSort('timestamp')}>
          Sort by Timestamp
        </button>
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
