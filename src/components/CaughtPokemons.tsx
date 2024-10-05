import { useCaughtPokemons } from '@hooks/useCaughtPokemonsSorting'
import { Link } from 'react-router-dom'
import { PokemonList } from './PokemonList'
import { useState } from 'react'
import { FilterByTypes } from './FilterByTypes'

function CaughtPokemonsPage() {
  const {
    removeSelectedPokemons,
    togglePokemonToRemove,
    pokemonsToRemove,
    filteredPokemons,
    setFilter,
    setSort,
  } = useCaughtPokemons()

  const handleFilter = () => {
    setFilter({
      name: 'bulb', // Exemplo de filtro por nome
      height: { min: 5, max: 10 }, // Filtro por altura
      types: ['grass', 'poison'], // Filtro por tipos
    })
  }

  const handleSort = (sortOption: 'name' | 'height' | 'timestamp') => {
    setSort(sortOption)
  }

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc') // Controla a direção atual

  const handleSortToggle = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    setSort('name', newDirection)
  }

  return (
    <>
      <h1>My Pokedex</h1>
      <p>
        <Link to="/">Back to Pokémon List</Link>
      </p>
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
      />
    </>
  )
}

export default CaughtPokemonsPage
