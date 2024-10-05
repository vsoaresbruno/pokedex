import { renderHook, act } from '@testing-library/react-hooks'
import { useCaughtPokemons } from '../useCaughtPokemons' // Adjust path if necessary
import { pokeApiClient } from '../../services/PokeApiClient' // Mock or fake implementation
import { vi, describe, it, beforeEach, expect } from 'vitest'

// Mock the PokeApiClient
// vi.mock('../../services/PokeApiClient', () => ({
//   fetchPokemonDetails: vi.fn(),
// }))
global.fetch = vi.fn()
const mockFetch = global.fetch as ReturnType<typeof vi.fn>

vi.mock(import('../../services/PokeApiClient'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    fetchPokemonDetails: vi.fn(),
    // your mocked methods
  }
})

describe('useCaughtPokemons hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock localStorage before each test
    const mockLocalStorage = {
      getItem: vi.fn().mockReturnValue('["bulbasaur"]'),
      setItem: vi.fn(),
    }
    // Mocking localStorage methods
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(
      mockLocalStorage.getItem
    )
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(
      mockLocalStorage.setItem
    )
  })

  //   it('should initially fetch caught pokemons from localStorage and set loading state', async () => {
  //     const { result, waitForNextUpdate } = renderHook(() => useCaughtPokemons())

  //     expect(result.current.isLoading).toBe(true)
  //     await waitForNextUpdate()

  //     expect(result.current.isLoading).toBe(false)
  //     expect(pokeApiClient.fetchPokemonDetails).toHaveBeenCalledTimes(1)
  //     expect(pokeApiClient.fetchPokemonDetails).toHaveBeenCalledWith('bulbasaur') // Assert mock call
  //     expect(result.current.caughtPokemons.length).toBeGreaterThanOrEqual(0) // Account for potential errors
  //   })

  //   it('should handle errors during details fetching', async () => {
  //     vi.mocked(pokeApiClient.fetchPokemonDetails).mockRejectedValueOnce(
  //       new Error('Network error')
  //     )

  //     const { result, waitForNextUpdate } = renderHook(() => useCaughtPokemons())

  //     expect(result.current.isLoading).toBe(true)
  //     await waitForNextUpdate()

  //     expect(result.current.isLoading).toBe(false)
  //     expect(console.error).toHaveBeenCalledWith(
  //       'Error fetching Pokémon details:',
  //       expect.any(Error)
  //     )
  //     expect(result.current.caughtPokemons.length).toBe(0) // No details should be set on error
  //   })

  //   it('should toggle pokemon to remove and update pokemonsToRemove state', () => {
  //     const { result } = renderHook(() => useCaughtPokemons())

  //     act(() => result.current.togglePokemonToRemove('pikachu'))
  //     expect(result.current.pokemonsToRemove).toEqual(['pikachu'])

  //     act(() => result.current.togglePokemonToRemove('pikachu'))
  //     expect(result.current.pokemonsToRemove).toEqual([])
  //   })

  it('should remove selected pokemons from caughtPokemons and update localStorage', async () => {
    const mockLocalStorage = {
      getItem: vi.fn().mockReturnValue('["bulbasaur", "charmander"]'),
      setItem: vi.fn(),
    }
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(
      mockLocalStorage.getItem
    )
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(
      mockLocalStorage.setItem
    )

    vi.mocked(pokeApiClient.fetchPokemonDetails).mockResolvedValueOnce({
      name: 'bulbasaur',
      sprites: {
        front_default: '',
      },
      height: 0,
      weight: 0,
      stats: [],
      types: [],
    })
    vi.mocked(pokeApiClient.fetchPokemonDetails).mockResolvedValueOnce({
      name: 'charmander',
      sprites: {
        front_default: '',
      },
      height: 0,
      weight: 0,
      stats: [],
      types: [],
    }) // Simulate details

    const { result } = renderHook(() => useCaughtPokemons())

    act(() => result.current.togglePokemonToRemove('charmander'))
    act(() => result.current.removeSelectedPokemons())

    expect(result.current.caughtPokemons).toEqual([{ name: 'bulbasaur' }])
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'caughtPokemons',
      '["bulbasaur"]'
    )
  })
})
