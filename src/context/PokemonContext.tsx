import React, { createContext, useState, useEffect } from 'react'
import { getAllPokemons, addPokemon, removePokemon } from '../services/db'

import { pokeApiClient } from '../services/PokeApiClient'
import { IPokemons } from '@/types/InterfacePokemons'

export interface IPokemonContext {
  totalPokemonCount: number
  caughtPokemonCount: number
  addCaughtPokemon: (pokemon: IPokemons) => void
  releasePokemon: (pokemonName: string) => void
  caughtPokemonProgress: string
  percentageProgress: number
}
// Create Context
export const PokemonContext = createContext<IPokemonContext>({
  totalPokemonCount: 0,
  caughtPokemonCount: 0,
  addCaughtPokemon: (): void => {},
  releasePokemon: (): void => {},
  caughtPokemonProgress: '',
  percentageProgress: 0,
})

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [totalPokemonCount, setTotalPokemonCount] = useState<number>(0)
  const [caughtPokemonCount, setCaughtPokemonCount] = useState<number>(0)
  const [percentageProgress, setPercentageProgress] = useState<number>(0)
  const [caughtPokemonProgress, setCaughtPokemonProgress] =
    useState<string>('0/0 - 0%')

  const { fetchAllPokemons } = pokeApiClient
  const loadCaughtPokemons = async () => {
    const caughtPokemons = await getAllPokemons()
    setCaughtPokemonCount(caughtPokemons.length)
  }

  const addCaughtPokemon = async (pokemon: IPokemons) => {
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
    setPercentageProgress(+percentage.toFixed(1))
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
  }, [addCaughtPokemon])
  return (
    <PokemonContext.Provider
      value={{
        totalPokemonCount,
        caughtPokemonCount,
        addCaughtPokemon,
        releasePokemon,
        caughtPokemonProgress,
        percentageProgress,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
