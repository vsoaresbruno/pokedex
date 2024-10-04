import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { pokeApiClient } from '@/services/PokeApiClient'
import { useState, useEffect } from 'react'

export const useCaughtPokemons = () => {
  const [caughtPokemons, setCaughtPokemons] = useState<IPokemonDetail[]>([])
  const { fetchPokemonDetails } = pokeApiClient

  useEffect(() => {
    const getCaughtPokemons = async () => {
      const storedCaughtPokemons = JSON.parse(
        localStorage.getItem('caught-pokemons') || '[]'
      )
      if (storedCaughtPokemons) {
        console.log('JSON.parse(storedCaughtPokemons', storedCaughtPokemons)
        const fetchDetailsPromises = storedCaughtPokemons.map(
          (pokemon: string) => fetchPokemonDetails(pokemon)
        )
        const fetchedDetails = await Promise.all(fetchDetailsPromises)
        setCaughtPokemons([
          ...fetchedDetails.filter((detail) => detail !== null),
        ])
      }
    }
    getCaughtPokemons()
  }, [])

  return {
    caughtPokemons,
  }
}
