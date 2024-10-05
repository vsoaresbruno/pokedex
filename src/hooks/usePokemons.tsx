import { useState, useEffect } from 'react'
import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { pokeApiClient } from '../services/PokeApiClient'
interface Pokemon {
  name: string
  url: string
}

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetail[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [caughtPokemons, setCaughtPokemons] = useState<IPokemonDetail[]>(
    JSON.parse(localStorage.getItem('caughtPokemons') || '[]')
  )

  const { fetchAllPokemons, fetchPokemonDetails } = pokeApiClient
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
      !isLoading
    ) {
      loadMorePokemons()
    }
  }

  const handleCatch = async (pokemonName: string) => {
    try {
      const pokemonDetail = await fetchPokemonDetails(pokemonName)

      if (pokemonDetail) {
        const updatedCaughtPokemons = [...caughtPokemons, pokemonDetail]
        setCaughtPokemons(updatedCaughtPokemons)

        localStorage.setItem(
          'caughtPokemons',
          JSON.stringify(updatedCaughtPokemons)
        )

        alert(`${pokemonName} has been caught!`)
      } else {
        throw new Error(`Failed to fetch details for ${pokemonName}`)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : String(error))
    }
  }

  const handleIsCaught = (pokemonName: string) =>
    caughtPokemons.some((pokemon) => pokemon.name === pokemonName)

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        const fetchedPokemons = await fetchAllPokemons(offset)
        setPokemons([...pokemons, ...fetchedPokemons])
        // Fetch details for the newly loaded Pokémon in parallel
        const fetchDetailsPromises = fetchedPokemons.map((pokemon) =>
          fetchPokemonDetails(pokemon.name)
        )
        const fetchedDetails = await Promise.all(fetchDetailsPromises)
        setPokemonDetails([
          ...pokemonDetails,
          ...fetchedDetails.filter(
            (detail): detail is IPokemonDetail => detail !== null
          ),
        ])
        setIsLoading(false)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : String(error))
      }
    }

    fetchInitialData()
  }, [offset])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const loadMorePokemons = async () => {
    setOffset((prevOffset) => prevOffset + 100)
  }

  return {
    loadMorePokemons,
    handleScroll,
    handleCatch,
    handleIsCaught,
    setCaughtPokemons,
    pokemons,
    isLoading,
    pokemonDetails,
    caughtPokemons,
    error,
  }
}
