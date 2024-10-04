// src/services/PokeApiClient.ts

import { Pokemon, PokemonData, PokemonDetail } from './InterfacePokeApiClient'

class PokeApiClient {
  private baseURL = 'https://pokeapi.co/api/v2'
  private caughtKey = 'caught-pokemons' // Key for localStorage

  fetchAllPokemons = async (offset: number): Promise<Pokemon[]> => {
    try {
      const response = await fetch(
        `${this.baseURL}/pokemon?limit=100&offset=${offset}`
      )
      const pokemonList = await response.json()

      return pokemonList.results
    } catch (error) {
      console.error('Error fetching all Pokémon data:', error)
      throw new Error(`Error fetching Pokémon data: ${error}`)
    }
  }

  fetchPokemonDetails = async (pokemonUrl: string): Promise<PokemonDetail> => {
    try {
      const response = await fetch(`${this.baseURL}/pokemon/${pokemonUrl}/`)
      const pokemonDetail = await response.json()

      return pokemonDetail
    } catch (error) {
      console.error('Error fetching Pokémon details:', error)
      throw new Error(`Error fetching Pokémon data: ${error}`)
    }
  }

  // Mark Pokémon as caught by name
  markAsCaught(pokemonName: string) {
    const caughtPokemons = this.getCaughtPokemons()
    if (!caughtPokemons.includes(pokemonName)) {
      caughtPokemons.push(pokemonName)
      localStorage.setItem(this.caughtKey, JSON.stringify(caughtPokemons))
    }
  }

  // Get the list of caught Pokémon names
  getCaughtPokemons(): string[] {
    const caughtPokemons = localStorage.getItem(this.caughtKey)
    return caughtPokemons ? JSON.parse(caughtPokemons) : []
  }

  // Check if a Pokémon is caught
  isCaught(pokemonName: string): boolean {
    const caughtPokemons = this.getCaughtPokemons()
    return caughtPokemons.includes(pokemonName)
  }
}

export const pokeApiClient = new PokeApiClient()
