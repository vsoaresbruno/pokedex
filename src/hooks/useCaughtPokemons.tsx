import { Pokemon, PokemonDetail } from '@/services/InterfacePokeApiClient'
import { pokeApiClient } from '@/services/PokeApiClient'
import { useState, useEffect } from 'react'

interface PokemonDetail {
  name: string
  sprites: {
    front_default: string
  }
}

export const useCaughtPokemons = () => {
  const [caughtPokemons, setCaughtPokemons] = useState<PokemonDetail[]>([])
  const { fetchPokemonDetails } = pokeApiClient

  useEffect(() => {
    const getCaughtPokemons = async () => {
      // Load caught Pokémon from local storage or any other persistent storage
      const storedCaughtPokemons = JSON.parse(
        localStorage.getItem('caught-pokemons') || '[]'
      )
      if (storedCaughtPokemons) {
        console.log('JSON.parse(storedCaughtPokemons', storedCaughtPokemons)
        // setCaughtPokemons(JSON.parse(storedCaughtPokemons))
        // Fetch details for the newly loaded Pokémon in parallel
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

  // const catchPokemon = (pokemon: CaughtPokemon) => {
  //   setCaughtPokemons([...caughtPokemons, pokemon])
  //   localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons))
  // }

  // const releasePokemon = (pokemonNames: string[]) => {
  //   const updatedCaughtPokemons = caughtPokemons.filter(
  //     (pokemon) => !pokemonNames.includes(pokemon.name)
  //   )
  //   setCaughtPokemons(updatedCaughtPokemons)
  //   localStorage.setItem(
  //     'caughtPokemons',
  //     JSON.stringify(updatedCaughtPokemons)
  //   )
  // }

  return {
    caughtPokemons,
    // catchPokemon,
    // releasePokemon,
  }
}
