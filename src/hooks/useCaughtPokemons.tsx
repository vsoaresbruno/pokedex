// import { IPokemons } from '@/services/InterfacePokeApiClient'
// import { PokemonContext } from '@/context/PokemonContext'
// import { getAllPokemons, updatePokemonNote } from '@/services/db'
// import { useState, useEffect, useContext } from 'react'

// type SortOption = 'name' | 'height' | 'timestamp' | 'type'
// type SortDirection = 'asc' | 'desc'
// type FilterOptions = {
//   name?: string
//   height?: { min?: number; max?: number }
//   types?: string[]
//   timestamp?: { after?: number; before?: number }
// }

// export const useCaughtPokemons = () => {
//   const { releasePokemon } = useContext(PokemonContext)

//   const [caughtPokemons, setCaughtPokemons] = useState<IPokemons[]>([])
//   const [pokemonsToRemove, setPokemonsToRemove] = useState<string[]>([])
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const [filteredPokemons, setFilteredPokemons] = useState<IPokemons[]>([])
//   const [sortOption, setSortOption] = useState<SortOption>('name')
//   const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({})

//   useEffect(() => {
//     const getCaughtPokemons = async () => {
//       setIsLoading(true)
//       const storedCaughtPokemons = await getAllPokemons()

//       if (storedCaughtPokemons.length > 0) {
//         setCaughtPokemons(storedCaughtPokemons)
//       }
//       setIsLoading(false)
//     }

//     getCaughtPokemons()
//   }, [])

//   useEffect(() => {
//     applyFiltersAndSort()
//   }, [caughtPokemons, filterOptions, sortOption, sortDirection])

//   const applyFiltersAndSort = () => {
//     let pokemons = [...caughtPokemons]

//     if (filterOptions.name) {
//       pokemons = pokemons.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(filterOptions.name!.toLowerCase())
//       )
//     }

//     if (filterOptions.height) {
//       const { min, max } = filterOptions.height
//       pokemons = pokemons.filter((pokemon) => {
//         const height = pokemon.pokemonDetails.height
//         return (!min || height >= min) && (!max || height <= max)
//       })
//     }

//     if (filterOptions.types && filterOptions.types.length > 0) {
//       pokemons = pokemons.filter((pokemon) =>
//         filterOptions.types!.some((type) =>
//           pokemon.pokemonDetails.types.some(
//             (pokemonType) => pokemonType.type.name === type
//           )
//         )
//       )
//     }

//     pokemons = sortPokemons(pokemons)

//     setFilteredPokemons(pokemons)
//   }

//   const sortPokemons = (pokemons: IPokemons[]): IPokemons[] => {
//     return pokemons.sort((a, b) => {
//       if (sortOption === 'name') {
//         const comparison = a.name.localeCompare(b.name)
//         return sortDirection === 'asc' ? comparison : -comparison
//       } else if (sortOption === 'height') {
//         return sortDirection === 'asc'
//           ? a.pokemonDetails.height - b.pokemonDetails.height
//           : b.pokemonDetails.height - a.pokemonDetails.height
//       } else if (sortOption === 'timestamp') {
//         const comparison = a.pokemonDetails.capturedAt.localeCompare(
//           b.pokemonDetails.capturedAt
//         )
//         return sortDirection === 'asc' ? comparison : -comparison
//       } else if (sortOption === 'type') {
//         const typeA = a.pokemonDetails.types[0]?.type.name || ''
//         const typeB = b.pokemonDetails.types[0]?.type.name || ''
//         const comparison = typeA.localeCompare(typeB)
//         return sortDirection === 'asc' ? comparison : -comparison
//       }
//       return 0
//     })
//   }

//   const togglePokemonToRemove = (pokemonName: string) => {
//     setPokemonsToRemove((prevSelected) =>
//       prevSelected.includes(pokemonName)
//         ? prevSelected.filter((name) => name !== pokemonName)
//         : [...prevSelected, pokemonName]
//     )
//   }

//   const removeSelectedPokemons = async () => {
//     const remainingPokemons = caughtPokemons.filter(
//       (pokemon) => !pokemonsToRemove.includes(pokemon.name)
//     )
//     setCaughtPokemons(remainingPokemons)

//     for (const pokemonName of pokemonsToRemove) {
//       releasePokemon(pokemonName)
//     }

//     setPokemonsToRemove([])
//   }

//   const setSort = (option: SortOption, direction: SortDirection = 'asc') => {
//     setSortOption(option)
//     setSortDirection(direction)
//   }

//   const setFilter = (options: FilterOptions) => {
//     setFilterOptions(options)
//   }

//   const updateNote = async (pokemonName: string, newNote: string) => {
//     const updatedPokemons = caughtPokemons.map((pokemon) => {
//       if (pokemon.name === pokemonName) {
//         return { ...pokemon, note: newNote }
//       }
//       return pokemon
//     })

//     setCaughtPokemons(updatedPokemons)
//     await updatePokemonNote(pokemonName, newNote)
//   }

//   return {
//     caughtPokemons,
//     filteredPokemons,
//     pokemonsToRemove,
//     isLoading,
//     togglePokemonToRemove,
//     removeSelectedPokemons,
//     setSort,
//     setFilter,
//     updateNote,
//     sortDirection,
//     setSortDirection,
//   }
// }
import { IPokemons } from '@/services/InterfacePokeApiClient'
import { PokemonContext } from '@/context/PokemonContext'
import { getAllPokemons, updatePokemonNote } from '@/services/db'
import { useState, useEffect, useContext } from 'react'
import { usePokemonFilters } from './usePokemonFilters' // Importa o hook de filtro
import { usePokemonSorting } from './usePokemonSorting' // Importa o hook de ordenação

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

  // Aplica os filtros e a ordenação em dois passos separados
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
    sortedPokemons, // Agora você retorna a lista de pokémons já filtrada e ordenada
    pokemonsToRemove,
    isLoading,
    togglePokemonToRemove,
    removeSelectedPokemons,
    setSort,
    setFilter,
    updateNote,
    sortDirection,
    setSortDirection,
  }
}
