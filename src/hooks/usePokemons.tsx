import { useState, useEffect, useContext } from 'react'
import { IPokemon, IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { pokeApiClient } from '../services/PokeApiClient'
import { getAllPokemons } from '../services/db'
import { PokemonContext } from '../context/PokemonContext'

export const usePokemons = () => {
  const { addCaughtPokemon } = useContext(PokemonContext)
  const { fetchAllPokemons, fetchPokemonDetails } = pokeApiClient

  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetail[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [caughtPokemons, setCaughtPokemons] = useState<IPokemonDetail[]>([])

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
      const pokemonDetails = await fetchPokemonDetails(pokemonName)
      if (pokemonDetails) {
        const capturedAt = new Date().toISOString()

        const pokemon = {
          ...pokemonDetails,
          capturedAt,
        }

        addCaughtPokemon(pokemon)

        setCaughtPokemons((prevCaughtPokemons) => [
          ...prevCaughtPokemons,
          pokemon,
        ])

        alert(`${pokemonName} has been caught!`)
      } else {
        alert(`Failed to fetch details for ${pokemonName}`)
      }
    } catch (error) {
      console.error('Error catching the Pokémon:', error)
      alert('There was an error catching the Pokémon. Please try again.')
    }
  }

  const handleIsCaught = (pokemonName: string) =>
    caughtPokemons.some((pokemon) => pokemon.name === pokemonName)

  const loadMorePokemons = async () => {
    setOffset((prevOffset) => prevOffset + 100)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        const fetchedPokemons = await fetchAllPokemons(offset)
        setPokemons([...pokemons, ...fetchedPokemons.results])
        // Fetch details for the newly loaded Pokémon in parallel
        const fetchDetailsPromises = fetchedPokemons.results.map((pokemon) =>
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
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
