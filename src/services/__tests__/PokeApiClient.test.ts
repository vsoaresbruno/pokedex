import { describe, it, expect, vi, beforeEach } from 'vitest'
import { pokeApiClient } from '../PokeApiClient'

global.fetch = vi.fn()
const mockFetch = global.fetch as ReturnType<typeof vi.fn>

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
  }
})()

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage })

describe('PokeApiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchAllPokemons', () => {
    it('should fetch a list of pokemons successfully', async () => {
      const mockResponse = {
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
        ],
      }
      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      })

      const pokemons = await pokeApiClient.fetchAllPokemons(0)
      expect(pokemons).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
      )
    })

    it('should throw an error if the API request fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API Error'))

      await expect(pokeApiClient.fetchAllPokemons(0)).rejects.toThrow(
        'Error fetching Pokémon data: Error: API Error'
      )
    })
  })

  describe('fetchPokemonDetails', () => {
    it('should fetch the details of a specific Pokémon successfully', async () => {
      const mockPokemonDetail = { name: 'bulbasaur', id: 1 }
      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockPokemonDetail),
      })

      const pokemonDetail = await pokeApiClient.fetchPokemonDetails('bulbasaur')
      expect(pokemonDetail).toEqual(mockPokemonDetail)
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur/'
      )
    })

    it('should throw an error if the API request fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API Error'))

      await expect(
        pokeApiClient.fetchPokemonDetails('bulbasaur')
      ).rejects.toThrow('Error fetching Pokémon data: Error: API Error')
    })
  })

  describe('fetchAllTypes', () => {
    it('should fetch the pokemons types successfully', async () => {
      const mockResponse = {
        results: [
          { name: 'dragon', url: 'https://pokeapi.co/api/v2/type/dragon' },
        ],
      }
      mockFetch.mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockResponse),
      })
      const pokemons = await pokeApiClient.fetchAllTypes()

      expect(pokemons).toEqual(mockResponse.results)
      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type')
    })

    it('should throw an error if the API request fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API Error'))

      await expect(pokeApiClient.fetchAllTypes()).rejects.toThrow(
        'Error fetching Pokémon data: Error: API Error'
      )
    })
  })
})
