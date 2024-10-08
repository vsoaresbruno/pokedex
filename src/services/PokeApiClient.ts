import {
  IAllPokemons,
  IPokemon,
  IPokemonDetail,
} from '../types/InterfacePokemons'

class PokeApiClient {
  private baseURL = 'https://pokeapi.co/api/v2'

  fetchPokemon = async ({ pageParam = `${this.baseURL}/pokemon?limit=20` }) => {
    const res = await fetch(pageParam)
    const data = await res.json()

    const pokemonData = await Promise.all(
      data.results.map(async (pokemon: IPokemon) => {
        const pokeRes = await fetch(pokemon.url)
        const pokemonDetails = await pokeRes.json()
        return {
          name: pokemon.name,
          pokemonDetails,
        }
      })
    )

    return { results: pokemonData, next: data.next }
  }

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
