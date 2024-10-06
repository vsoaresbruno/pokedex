import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'
import { useSharePokemon } from '../useSharePokemon'

describe('useSharePokemon', () => {
  const mockPokemon = {
    id: 8,
    name: 'Wartortle',
    sprites: {
      front_default: 'https://example.com/wartortle.png',
    },
  }

  beforeEach(() => {
    window.open = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should generate the correct message and WhatsApp link', () => {
    const { result } = renderHook(() => useSharePokemon(mockPokemon))

    act(() => {
      result.current.handleShare()
    })

    expect(window.open).toHaveBeenCalledTimes(1)
    expect(window.open).toHaveBeenCalledWith(
      'https://wa.me/?text=I%20caught%20%0A%0A%238%20-%20Wartortle%0A!%20check%20out!%0Ahttps%3A%2F%2Fexample.com%2Fwartortle.png',
      '_blank'
    ) // Verifica os argumentos
  })
})
