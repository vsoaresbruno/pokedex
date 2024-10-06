import { pokeApiClient } from '../services/PokeApiClient'
import { useEffect, useState } from 'react'

interface IFilterTypes {
  setFilter: (filter: { types: string[] }) => void
}

export const useFilterTypes = ({ setFilter }: IFilterTypes) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const { fetchAllTypes } = pokeApiClient

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    )
  }

  const clearFilter = () => {
    setSelectedTypes([])
  }

  useEffect(() => {
    setFilter({ types: selectedTypes })
  }, [selectedTypes])

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      setIsLoading(true)
      try {
        const fetchedPokemonTypes = await fetchAllTypes()
        const typesNames = fetchedPokemonTypes.map((pokemon) => pokemon.name)
        setPokemonTypes(typesNames)

        setIsLoading(false)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : String(error))
      }
    }

    fetchPokemonTypes()
  }, [])

  return {
    isLoading,
    pokemonTypes,
    error,
    selectedTypes,
    handleTypeChange,
    clearFilter,
  }
}
