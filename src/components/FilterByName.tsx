import { useFilterName } from '@/hooks/useFilterName'
import '../css/FilterByTypes.css'

interface IFilterByName {
  setFilter: (filter: { name: string }) => void
}
export const FilterByName = ({ setFilter }: IFilterByName) => {
  const { handleNameFilter } = useFilterName({
    setFilter,
  })

  return (
    <input
      type="text"
      placeholder="Search your Pokemon"
      onChange={(e) => handleNameFilter(e.target.value)}
    />
  )
}
