import {
  IAllPokemons,
  IPokemon,
  IPokemonDetail,
} from './InterfacePokeApiClient'

class PokeApiClient {
  private baseURL = 'https://pokeapi.co/api/v2'

  fetchAllPokemons = async (offset: number): Promise<IAllPokemons> => {
    try {
      const response = await fetch(
        `${this.baseURL}/pokemon?limit=100&offset=${offset}`
      )
      const pokemonList = await response.json()
      return pokemonList
    } catch (error) {
      console.error('Error fetching all Pokémon data:', error)
      throw new Error(`Error fetching Pokémon data: ${error}`)
    }
  }

  fetchPokemonDetails = async (pokemonUrl: string): Promise<IPokemonDetail> => {
    try {
      const response = await fetch(`${this.baseURL}/pokemon/${pokemonUrl}/`)
      const pokemonDetail = await response.json()

      return pokemonDetail
    } catch (error) {
      console.error('Error fetching Pokémon details:', error)
      throw new Error(`Error fetching Pokémon data: ${error}`)
    }
  }

  fetchAllTypes = async (): Promise<IPokemon[]> => {
    try {
      const response = await fetch(`${this.baseURL}/type`)
      const pokemonTypes = await response.json()

      return pokemonTypes.results
    } catch (error) {
      console.error('Error fetching Pokémon types:', error)
      throw new Error(`Error fetching Pokémon data: ${error}`)
    }
  }
}

export const pokeApiClient = new PokeApiClient()
