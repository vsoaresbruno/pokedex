interface IFilterName {
  setFilter: (filter: { name: string }) => void
}

export const useFilterName = ({ setFilter }: IFilterName) => {
  const handleNameFilter = (pokemonName: string) => {
    setFilter({ name: pokemonName })
  }

  return {
    handleNameFilter,
  }
}
