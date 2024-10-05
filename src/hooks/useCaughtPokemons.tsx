import { IPokemonDetail } from '@/services/InterfacePokeApiClient'
import { pokeApiClient } from '../services/PokeApiClient'
import { useState, useEffect } from 'react'

export const useCaughtPokemons = () => {
  const [caughtPokemons, setCaughtPokemons] = useState<IPokemonDetail[]>([])
  const [pokemonsToRemove, setPokemonsToRemove] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { fetchPokemonDetails } = pokeApiClient

  useEffect(() => {
    const getCaughtPokemons = async () => {
      setIsLoading(true)
      const storedCaughtPokemons = JSON.parse(
        localStorage.getItem('caughtPokemons') || '[]'
      )
      if (storedCaughtPokemons.length > 0) {
        try {
          const fetchDetailsPromises = storedCaughtPokemons.map(
            (pokemon: string) => fetchPokemonDetails(pokemon)
          )
          const fetchedDetails = await Promise.all(fetchDetailsPromises)
          setCaughtPokemons(fetchedDetails.filter((detail) => detail !== null))
        } catch (error) {
          console.error('Error fetching Pokémon details:', error)
        }
      }
      setIsLoading(false)
    }

    getCaughtPokemons()
  }, []) // Certifique-se de que o efeito só rode uma vez, na montagem

  const togglePokemonToRemove = (pokemonName: string) => {
    setPokemonsToRemove((prevSelected) =>
      prevSelected.includes(pokemonName)
        ? prevSelected.filter((name) => name !== pokemonName)
        : [...prevSelected, pokemonName]
    )
  }

  const removeSelectedPokemons = () => {
    const remainingPokemons = caughtPokemons.filter(
      (pokemon) => !pokemonsToRemove.includes(pokemon.name)
    )
    setCaughtPokemons(remainingPokemons)
    localStorage.setItem(
      'caughtPokemons',
      JSON.stringify(remainingPokemons.map((pokemon) => pokemon.name))
    )
    setPokemonsToRemove([]) // Limpa a seleção após a remoção
  }

  return {
    caughtPokemons,
    pokemonsToRemove,
    togglePokemonToRemove,
    removeSelectedPokemons,
    isLoading, // Indicador de carregamento
  }
}
