import { describe, it, beforeEach, expect } from 'vitest'
import { usePokemonSorting } from '../usePokemonSorting'
import { IPokemons, IPokemonDetail } from '@/services/InterfacePokeApiClient'

describe('usePokemonSorting', () => {
  let mockCaughtPokemons: IPokemons[]

  beforeEach(() => {
    mockCaughtPokemons = [
      {
        name: 'charmander',
        pokemonDetails: {
          capturedAt: '2024-10-07T08:00:00.000Z',
          height: 6,
          types: [{ type: { name: 'fire' } }],
        } as IPokemonDetail,
      },
      {
        name: 'bulbasaur',
        pokemonDetails: {
          capturedAt: '2024-10-06T12:00:00.000Z',
          height: 7,
          types: [{ type: { name: 'grass' } }],
        } as IPokemonDetail,
      },
      {
        name: 'squirtle',
        pokemonDetails: {
          capturedAt: '2024-10-07T06:00:00.000Z',
          height: 5,
          types: [{ type: { name: 'water' } }],
        } as IPokemonDetail,
      },
    ]
  })

  it('returns Pokemons in original order initially', () => {
    const sortedPokemons = usePokemonSorting(mockCaughtPokemons, 'name', 'asc')
    expect(sortedPokemons).toEqual(mockCaughtPokemons)
  })

  it('sorts Pokemons by name (ascending)', () => {
    const sortedPokemons = usePokemonSorting(mockCaughtPokemons, 'name', 'asc')
    expect(sortedPokemons).toEqual(mockCaughtPokemons)
  })

  it('sorts Pokemons by name (descending)', () => {
    const sortedPokemons = usePokemonSorting(mockCaughtPokemons, 'name', 'desc')
    expect(sortedPokemons).toEqual([
      {
        name: 'squirtle',
        pokemonDetails: {
          capturedAt: '2024-10-07T06:00:00.000Z',
          height: 5,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
        },
      },
      {
        name: 'charmander',
        pokemonDetails: {
          capturedAt: '2024-10-07T08:00:00.000Z',
          height: 6,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
          ],
        },
      },
      {
        name: 'bulbasaur',
        pokemonDetails: {
          capturedAt: '2024-10-06T12:00:00.000Z',
          height: 7,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
          ],
        },
      },
    ])
  })

  it('sorts Pokemons by height (ascending)', () => {
    const sortedPokemons = usePokemonSorting(
      mockCaughtPokemons,
      'height',
      'asc'
    )
    expect(sortedPokemons).toEqual([
      {
        name: 'squirtle',
        pokemonDetails: {
          capturedAt: '2024-10-07T06:00:00.000Z',
          height: 5,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
        },
      },
      {
        name: 'charmander',
        pokemonDetails: {
          capturedAt: '2024-10-07T08:00:00.000Z',
          height: 6,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
          ],
        },
      },
      {
        name: 'bulbasaur',
        pokemonDetails: {
          capturedAt: '2024-10-06T12:00:00.000Z',
          height: 7,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
          ],
        },
      },
    ])
  })

  it('sorts Pokemons by capturedAt (ascending)', () => {
    const sortedPokemons = usePokemonSorting(
      mockCaughtPokemons,
      'timestamp',
      'asc'
    )
    expect(sortedPokemons).toEqual([
      {
        name: 'bulbasaur',
        pokemonDetails: {
          capturedAt: '2024-10-06T12:00:00.000Z',
          height: 7,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
          ],
        },
      },
      {
        name: 'squirtle',
        pokemonDetails: {
          capturedAt: '2024-10-07T06:00:00.000Z',
          height: 5,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
        },
      },
      {
        name: 'charmander',
        pokemonDetails: {
          capturedAt: '2024-10-07T08:00:00.000Z',
          height: 6,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
          ],
        },
      },
    ])
  })

  it('sorts Pokemons by type (ascending)', () => {
    const sortedPokemons = usePokemonSorting(mockCaughtPokemons, 'type', 'asc')
    expect(sortedPokemons).toEqual([
      {
        name: 'charmander',
        pokemonDetails: {
          capturedAt: '2024-10-07T08:00:00.000Z',
          height: 6,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
          ],
        },
      },
      {
        name: 'bulbasaur',
        pokemonDetails: {
          capturedAt: '2024-10-06T12:00:00.000Z',
          height: 7,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
          ],
        },
      },
      {
        name: 'squirtle',
        pokemonDetails: {
          capturedAt: '2024-10-07T06:00:00.000Z',
          height: 5,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
        },
      },
    ])
  })
})
