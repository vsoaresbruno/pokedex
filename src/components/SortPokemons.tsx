interface ISortPokemon {
  setSortDirection: (sortDirection: 'asc' | 'desc') => void
  setSort: (
    sortOption: 'name' | 'height' | 'timestamp' | 'type',
    sortDirection: 'asc' | 'desc'
  ) => void
  sortDirection: 'asc' | 'desc'
}

export const SortPokemons = ({
  setSortDirection,
  setSort,
  sortDirection,
}: ISortPokemon) => {
  const handleSort = (sortOption: 'name' | 'height' | 'timestamp' | 'type') => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    setSort(sortOption, newDirection)
  }

  return (
    <div>
      <button onClick={() => handleSort('name')}>
        Sort by Name ({sortDirection === 'asc' ? 'Desc' : 'Asc'})
      </button>
      <button onClick={() => handleSort('height')}>Sort by Height</button>
      <button onClick={() => handleSort('timestamp')}>Sort by Timestamp</button>
      <button onClick={() => handleSort('type')}>Sort by Type</button>
    </div>
  )
}
