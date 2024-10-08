import { IPokemons } from '@/types/InterfacePokemons'
import { useState } from 'react'

export const usePokemonDetails = (pokemonDetails: IPokemons[]) => {
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemons | null>(null)
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
