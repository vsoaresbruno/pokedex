import { useCaughtPokemons } from '@hooks/useCaughtPokemonsSorting'
import { Link } from 'react-router-dom'
import { PokemonList } from './PokemonList'
import { useState } from 'react'

function CaughtPokemonsPage() {
  const {
    removeSelectedPokemons,
    togglePokemonToRemove,
    pokemonsToRemove,
    caughtPokemons,
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
    setSort('name', newDirection) // Alterna a ordenação por nome
  }

  return (
    <>
      <h1>Caught Pokémon</h1>
      <Link to="/">Back to Pokémon List</Link>
      <button onClick={handleSortToggle}>
        Sort by Name ({sortDirection === 'asc' ? 'Desc' : 'Asc'})
      </button>
      <button onClick={() => handleSort('height')}>Sort by Height</button>
      <button onClick={() => handleSort('timestamp')}>Sort by Timestamp</button>

      <button onClick={handleFilter}>Apply Filters</button>
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
