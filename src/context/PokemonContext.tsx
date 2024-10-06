import React, { createContext, useState, useEffect } from 'react'
import { getAllPokemons, addPokemon, removePokemon } from '../services/db'

import { pokeApiClient } from '../services/PokeApiClient'

export interface IPokemonContext {
  totalPokemonCount: number
  caughtPokemonCount: number
  addCaughtPokemon: (pokemon: string) => void
  releasePokemon: (pokemonName: string) => void
  getCaughtPokemonProgress: () => void
  caughtPokemonProgress: string
}
// Create Context
export const PokemonContext = createContext<IPokemonContext>({
  totalPokemonCount: 0,
  caughtPokemonCount: 0,
  addCaughtPokemon: (pokemon: string): void => {},
  releasePokemon: (pokemon: string): void => {},
  getCaughtPokemonProgress: (): void => {},
  caughtPokemonProgress: '',
})

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [totalPokemonCount, setTotalPokemonCount] = useState<number>(0)
  const [caughtPokemonCount, setCaughtPokemonCount] = useState<number>(0)
  const [caughtPokemonProgress, setCaughtPokemonProgress] =
    useState<string>('0/0 - 0%')

  const { fetchAllPokemons } = pokeApiClient
  const loadCaughtPokemons = async () => {
    const caughtPokemons = await getAllPokemons()
    setCaughtPokemonCount(caughtPokemons.length)
  }

  const addCaughtPokemon = async (pokemon: string) => {
    await addPokemon(pokemon)
    await loadCaughtPokemons()
  }

  const releasePokemon = async (pokemonName: string) => {
    await removePokemon(pokemonName)
    await loadCaughtPokemons()
  }

  const getCaughtPokemonProgress = () => {
    const percentage =
      totalPokemonCount > 0 ? (caughtPokemonCount / totalPokemonCount) * 100 : 0
    const progress = `${caughtPokemonCount}/${totalPokemonCount} - ${percentage.toFixed(1)}%`
    setCaughtPokemonProgress(progress)
  }

  useEffect(() => {
    const fetchPokemonCount = async () => {
      const allPokemon = await fetchAllPokemons(0)
      setTotalPokemonCount(allPokemon.count)
    }

    fetchPokemonCount()
    loadCaughtPokemons()
    getCaughtPokemonProgress()
  }, [])
  return (
    <PokemonContext.Provider
      value={{
        totalPokemonCount,
        caughtPokemonCount,
        addCaughtPokemon,
        releasePokemon,
        getCaughtPokemonProgress,
        caughtPokemonProgress,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
