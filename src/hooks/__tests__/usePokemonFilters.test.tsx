import { describe, it, beforeEach, expect } from 'vitest'
import { IPokemons, IPokemonDetail } from '@/types/InterfacePokemons'
import { usePokemonFilters } from '../usePokemonFilters'

describe('usePokemonFilters', () => {
  let mockCaughtPokemons: IPokemons[]
  beforeEach(() => {
    mockCaughtPokemons = [
      {
        name: 'bulbasaur',
        pokemonDetails: {
          height: 7,
          types: [{ type: { name: 'grass' } }],
        } as IPokemonDetail,
      },
      {
        name: 'charmander',
        pokemonDetails: {
          height: 6,
          types: [{ type: { name: 'fire' } }],
        } as IPokemonDetail,
      },
      {
        name: 'squirtle',
        pokemonDetails: {
          height: 5,
          types: [{ type: { name: 'water' } }],
        } as IPokemonDetail,
      },
    ]
  })

  it('returns all Pokemons initially', () => {
    const filteredPokemons = usePokemonFilters(mockCaughtPokemons, {})
    expect(filteredPokemons).toEqual(mockCaughtPokemons)
  })

  it('filters Pokemons by name', () => {
    const filterOptions = { name: 'bulbasaur' }
    const filteredPokemons = usePokemonFilters(
      mockCaughtPokemons,
      filterOptions
    )
    expect(filteredPokemons).toEqual([mockCaughtPokemons[0]])
  })

  it('filters Pokemons by height range', () => {
    const filterOptions = { height: { min: 6, max: 7 } }
    const filteredPokemons = usePokemonFilters(
      mockCaughtPokemons,
      filterOptions
    )
    expect(filteredPokemons).toEqual([
      mockCaughtPokemons[0],
      mockCaughtPokemons[1],
    ])
  })

  it('filters Pokemons by types', () => {
    const filterOptions = { types: ['fire'] }
    const filteredPokemons = usePokemonFilters(
      mockCaughtPokemons,
      filterOptions
    )
    expect(filteredPokemons).toEqual([mockCaughtPokemons[1]])
  })
})
