import { IPokemons } from '@/services/InterfacePokeApiClient'
import { PokemonContext } from '../context/PokemonContext'
import { getAllPokemons, updatePokemonNote } from '../services/db'
import { useState, useEffect, useContext } from 'react'
import { usePokemonFilters } from './usePokemonFilters'
import { usePokemonSorting } from './usePokemonSorting'

type SortOption = 'name' | 'height' | 'timestamp' | 'type'
type SortDirection = 'asc' | 'desc'
type FilterOptions = {
  name?: string
  height?: { min?: number; max?: number }
  types?: string[]
  timestamp?: { after?: number; before?: number }
}

export const useCaughtPokemons = () => {
  const { releasePokemon } = useContext(PokemonContext)

  const [caughtPokemons, setCaughtPokemons] = useState<IPokemons[]>([])
  const [pokemonsToRemove, setPokemonsToRemove] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sortOption, setSortOption] = useState<SortOption>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})

  useEffect(() => {
    try {
      const getCaughtPokemons = async () => {
        setIsLoading(true)
        const storedCaughtPokemons = await getAllPokemons()

        if (storedCaughtPokemons.length > 0) {
          setCaughtPokemons(storedCaughtPokemons)
        }
        setIsLoading(false)
      }

      getCaughtPokemons()
    } catch (error) {
      console.error('Error fetching caught Pokemons:', error)
      setIsLoading(false)
    }
  }, [])

  const filteredPokemons = usePokemonFilters(caughtPokemons, filterOptions)
  const sortedPokemons = usePokemonSorting(
    filteredPokemons,
    sortOption,
    sortDirection
  )

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

  const updateNote = async (pokemonName: string, newNote: string) => {
    const updatedPokemons = caughtPokemons.map((pokemon) => {
      if (pokemon.name === pokemonName) {
        return { ...pokemon, note: newNote }
      }
      return pokemon
    })

    setCaughtPokemons(updatedPokemons)
    await updatePokemonNote(pokemonName, newNote)
  }

  return {
    caughtPokemons,
    sortedPokemons,
    pokemonsToRemove,
    isLoading,
    togglePokemonToRemove,
    removeSelectedPokemons,
    setSort,
    setFilter,
    updateNote,
    sortDirection,
    setSortDirection,
    setCaughtPokemons,
    setPokemonsToRemove,
  }
}
