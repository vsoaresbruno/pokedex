import { useState, useEffect, useContext, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

import { IPokemons } from '@/services/InterfacePokeApiClient'
import { pokeApiClient } from '../services/PokeApiClient'
import { getAllPokemons } from '../services/db'
import { PokemonContext } from '../context/PokemonContext'

export const usePokemons = () => {
  const { addCaughtPokemon } = useContext(PokemonContext)
  const { fetchPokemon } = pokeApiClient
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery('pokemons', fetchPokemon, {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [caughtPokemons, setCaughtPokemons] = useState<IPokemons[]>([])
  const pokemonList = data?.pages.map((page) => page.results).flat() || []

  const handleCatch = async (pokemonName: string) => {
    try {
      const caughtPokemon = pokemonList.find(
        (pokemon) => pokemon.name === pokemonName
      )
      if (caughtPokemon) {
        const capturedAt = new Date().toISOString()

        const pokemon = {
          name: caughtPokemon.name,
          pokemonDetails: {
            ...caughtPokemon.pokemonDetails,
            capturedAt,
          },
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

  const loadMoreRef = useRef(null)

  useEffect(() => {
    if (loadMoreRef.current && hasNextPage) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            fetchNextPage()
          }
        }
      )
      observer.observe(loadMoreRef.current)

      return () => {
        if (loadMoreRef.current) {
          observer.unobserve(loadMoreRef.current)
        }
      }
    }
  }, [hasNextPage, fetchNextPage])

  return {
    handleCatch,
    handleIsCaught,
    setCaughtPokemons,
    isLoading,
    caughtPokemons,
    pokemonList,
    status,
    loadMoreRef,
    isFetchingNextPage,
  }
}
