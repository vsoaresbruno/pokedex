import { SortDirection, SortOption } from '@/hooks/useCaughtPokemons'
import { Dropdown } from './shared/Dropdown/Dropdown'

interface ISortPokemon {
  setSortDirection: (sortDirection: SortDirection) => void
  setSort: (sortOption: SortOption, sortDirection: SortDirection) => void
}

export const SortPokemons = ({ setSortDirection, setSort }: ISortPokemon) => {
  const handleSort = (sortOption: SortOption, sortDirection: SortDirection) => {
    setSortDirection(sortDirection)
    setSort(sortOption, sortDirection)
  }
  const sortOptions = [
    { label: 'Name Asc', value: 'name-asc' },
    { label: 'Name Desc', value: 'name-desc' },
    { label: 'Height Asc', value: 'height-asc' },
    { label: 'Height Desc', value: 'height-desc' },
    { label: 'Timestamp Asc', value: 'timestamp-asc' },
    { label: 'Timestamp Desc', value: 'timestamp-desc' },
    { label: 'Type Asc', value: 'type-asc' },
    { label: 'Type Desc', value: 'type-desc' },
  ]

  return (
    <label>
      Sorting by:{' '}
      <Dropdown
        options={sortOptions}
        onChange={(e) => {
          const [sortOption, sortDirection] = e.target.value.split('-')
          handleSort(sortOption as SortOption, sortDirection as SortDirection)
        }}
      />
    </label>
  )
}
