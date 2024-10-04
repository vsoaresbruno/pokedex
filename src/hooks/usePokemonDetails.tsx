import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { useState } from 'react'

export const usePokemonDetails = (pokemonDetails: IPokemonDetail[]) => {
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemonDetail | null>(
    null
  )
  const handleSelectPokemon = (name: string) => {
    const pokemon = pokemonDetails.find((p) => p.name === name)
    setSelectedPokemon(pokemon || null)
  }

  const handleCloseDetail = () => {
    setSelectedPokemon(null)
  }

  return {
    handleSelectPokemon,
    handleCloseDetail,
    selectedPokemon,
  }
}
