import { IPokemons } from '@/types/InterfacePokemons'

type SortOption = 'name' | 'height' | 'timestamp' | 'type'
type SortDirection = 'asc' | 'desc'

export const usePokemonSorting = (
  pokemons: IPokemons[],
  sortOption: SortOption,
  sortDirection: SortDirection
): IPokemons[] => {
  const sortPokemons = (): IPokemons[] => {
    return pokemons.sort((a, b) => {
      if (sortOption === 'name') {
        const comparison = a.name.localeCompare(b.name)
        return sortDirection === 'asc' ? comparison : -comparison
      } else if (sortOption === 'height') {
        return sortDirection === 'asc'
          ? a.pokemonDetails.height - b.pokemonDetails.height
          : b.pokemonDetails.height - a.pokemonDetails.height
      } else if (sortOption === 'timestamp') {
        const comparison = a.pokemonDetails.capturedAt.localeCompare(
          b.pokemonDetails.capturedAt
        )
        return sortDirection === 'asc' ? comparison : -comparison
      } else if (sortOption === 'type') {
        const typeA = a.pokemonDetails.types[0]?.type.name || ''
        const typeB = b.pokemonDetails.types[0]?.type.name || ''
        const comparison = typeA.localeCompare(typeB)
        return sortDirection === 'asc' ? comparison : -comparison
      }
      return 0
    })
  }

  return sortPokemons()
}
