import { IPokemons } from '@/services/InterfacePokeApiClient'

type FilterOptions = {
  name?: string
  height?: { min?: number; max?: number }
  types?: string[]
  timestamp?: { after?: number; before?: number }
}

export const usePokemonFilters = (
  caughtPokemons: IPokemons[],
  filterOptions: FilterOptions
): IPokemons[] => {
  const applyFilters = (): IPokemons[] => {
    let pokemons = [...caughtPokemons]

    if (filterOptions.name) {
      pokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filterOptions.name!.toLowerCase())
      )
    }

    if (filterOptions.height) {
      const { min, max } = filterOptions.height
      pokemons = pokemons.filter((pokemon) => {
        const height = pokemon.pokemonDetails.height
        return (!min || height >= min) && (!max || height <= max)
      })
    }

    if (filterOptions.types && filterOptions.types.length > 0) {
      pokemons = pokemons.filter((pokemon) =>
        filterOptions.types!.some((type) =>
          pokemon.pokemonDetails.types.some(
            (pokemonType) => pokemonType.type.name === type
          )
        )
      )
    }

    return pokemons
  }

  return applyFilters()
}
