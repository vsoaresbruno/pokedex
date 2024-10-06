import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { useState, useEffect, useContext } from 'react'
import { getAllPokemons } from '@/services/db'
import { PokemonContext } from '@/context/PokemonContext'

type SortOption = 'name' | 'height' | 'timestamp'
type SortDirection = 'asc' | 'desc'
type FilterOptions = {
  name?: string
  height?: { min?: number; max?: number }
  types?: string[]
}

export const useCaughtPokemons = () => {
  const { releasePokemon } = useContext(PokemonContext)

  const [caughtPokemons, setCaughtPokemons] = useState<IPokemonDetail[]>([])
  const [pokemonsToRemove, setPokemonsToRemove] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemonDetail[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})

  useEffect(() => {
    const getCaughtPokemons = async () => {
      setIsLoading(true)
      const storedCaughtPokemons = await getAllPokemons()

      if (storedCaughtPokemons.length > 0) {
        setCaughtPokemons(storedCaughtPokemons)
      }
      setIsLoading(false)
    }

    getCaughtPokemons()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [caughtPokemons, filterOptions, sortOption, sortDirection])

  const applyFiltersAndSort = () => {
    let pokemons = [...caughtPokemons]

    if (filterOptions.name) {
      pokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filterOptions.name!.toLowerCase())
      )
    }

    if (filterOptions.height) {
      const { min, max } = filterOptions.height
      pokemons = pokemons.filter((pokemon) => {
        const height = pokemon.height
        return (!min || height >= min) && (!max || height <= max)
      })
    }

    if (filterOptions.types && filterOptions.types.length > 0) {
      pokemons = pokemons.filter((pokemon) =>
        filterOptions.types!.some((type) =>
          pokemon.types.some((pokemonType) => pokemonType.type.name === type)
        )
      )
    }

    pokemons = sortPokemons(pokemons)

    setFilteredPokemons(pokemons)
  }

  const sortPokemons = (pokemons: IPokemonDetail[]): IPokemonDetail[] => {
    return pokemons.sort((a, b) => {
      if (sortOption === 'name') {
        const comparison = a.name.localeCompare(b.name)
        return sortDirection === 'asc' ? comparison : -comparison
      } else if (sortOption === 'height') {
        return sortDirection === 'asc'
          ? a.height - b.height
          : b.height - a.height
      }
      return 0
    })
  }

  const togglePokemonToRemove = (pokemonName: string) => {
    setPokemonsToRemove((prevSelected) =>
      prevSelected.includes(pokemonName)
        ? prevSelected.filter((name) => name !== pokemonName)
        : [...prevSelected, pokemonName]
    )
  }

  const removeSelectedPokemons = async () => {
    const remainingPokemons = caughtPokemons.filter(
      (pokemon) => !pokemonsToRemove.includes(pokemon.name)
    )
    setCaughtPokemons(remainingPokemons)

    for (const pokemonName of pokemonsToRemove) {
      releasePokemon(pokemonName)
    }

    setPokemonsToRemove([])
  }

  const setSort = (option: SortOption, direction: SortDirection = 'asc') => {
    setSortOption(option)
    setSortDirection(direction)
  }

  const setFilter = (options: FilterOptions) => {
    setFilterOptions(options)
  }

  return {
    caughtPokemons,
    filteredPokemons,
    pokemonsToRemove,
    isLoading,
    togglePokemonToRemove,
    removeSelectedPokemons,
    setSort,
    setFilter,
  }
}
