import { POKEMON_TYPES, TYPE_COLORS } from '@/consts/constants'
import { useFilterTypes } from '@/hooks/useFilterTypes'
import '../css/FilterByTypes.css'

interface IFilterByTypes {
  setFilter: (filter: { types: string[] }) => void
}
export const FilterByTypes = ({ setFilter }: IFilterByTypes) => {
  const {
    isLoading,
    clearFilter,
    handleTypeChange,
    selectedTypes,
    pokemonTypes,
  } = useFilterTypes({
    setFilter,
  })

  return (
    <div>
      {pokemonTypes.map((type) => (
        <label
          key={type}
          className={`type-checkbox ${selectedTypes.includes(type) ? 'selected' : ''}`}
          style={{ backgroundColor: TYPE_COLORS[type] }}
        >
          <input
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeChange(type)}
          />
          {type}
        </label>
      ))}
      <label
        className="type-checkbox clear-filter"
        onClick={clearFilter}
        style={{
          border: '1px solid #CCCCCC',
          color: '#000',
          cursor: 'pointer',
        }}
      >
        Clear types
      </label>
    </div>
  )
}
