import { POKEMON_TYPES, TYPE_COLORS } from '@/consts/constants'
import { useEffect, useState } from 'react'
import '../css/FilterByTypes.css'

interface IFilterByTypes {
  setFilter: (filter: { types: string[] }) => void
}
export const FilterByTypes = ({ setFilter }: IFilterByTypes) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    )
  }

  const clearFilter = () => {
    setSelectedTypes([]) // Limpa todas as seleções
  }

  useEffect(() => {
    setFilter({ types: selectedTypes })
  }, [selectedTypes])

  return (
    <div>
      {POKEMON_TYPES.map((type) => (
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
