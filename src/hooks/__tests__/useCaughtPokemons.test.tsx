import { vi, describe, it, beforeEach, expect, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'

import { IPokemons, IPokemonDetail } from '@/types/InterfacePokemons'
import { useCaughtPokemons } from '../useCaughtPokemons'
import { getAllPokemons, updatePokemonNote } from '../../services/db'
import { PokemonContext } from '../../context/PokemonContext'
import { useContext } from 'react'

describe('useCaughtPokemons', () => {
  let mockGetAllPokemons: any
  let mockReleasePokemon: any
  let mockUpdatePokemonNote: any

  const mocks = vi.hoisted(() => {
    return {
      getAllPokemons: vi.fn(),
    }
  })

  beforeEach(() => {
    mockGetAllPokemons = vi.fn()
    mockReleasePokemon = vi.fn()
    mockUpdatePokemonNote = vi.fn()

    vi.mock('../../services/db', () => {
      return {
        getAllPokemons: mocks.getAllPokemons,
      }
    })

    vi.mock('react', async () => {
      const actualReact = await vi.importActual('react')
      return {
        ...actualReact,
        useContext: vi.fn(() => ({ releasePokemon: vi.fn() })),
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and sets caught Pokemons on mount', async () => {
    const mockPokemons: IPokemons[] = [
      { name: 'bulbasaur', pokemonDetails: {} as IPokemonDetail },
      { name: 'charmander', pokemonDetails: {} as IPokemonDetail },
    ]

    mocks.getAllPokemons.mockResolvedValueOnce(mockPokemons)

    const { result, waitForNextUpdate } = renderHook(() => useCaughtPokemons())

    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.caughtPokemons).toEqual(mockPokemons)
  })

  it('toggles a Pokemon for removal', () => {
    const mockPokemons: IPokemons[] = [
      { name: 'bulbasaur', pokemonDetails: {} as IPokemonDetail },
      { name: 'charmander', pokemonDetails: {} as IPokemonDetail },
    ]

    mocks.getAllPokemons.mockResolvedValueOnce(mockPokemons)
    const { result } = renderHook(() => useCaughtPokemons())

    result.current.togglePokemonToRemove('bulbasaur')
    expect(result.current.pokemonsToRemove).toEqual(['bulbasaur'])

    result.current.togglePokemonToRemove('bulbasaur')
    expect(result.current.pokemonsToRemove).toEqual([])
  })
})
