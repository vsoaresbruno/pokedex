import { vi, describe, it, beforeEach, expect } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { useFilterTypes } from '../useFilterTypes'

vi.mock('../../services/PokeApiClient', async (importOriginal) => {
  const actual = (await importOriginal()) as { fetchAllTypes: unknown }
  return {
    ...actual,
    fetchAllTypes: vi
      .fn()
      .mockResolvedValue({ results: [{ name: 'fire' }, { name: 'water' }] }),
  }
})

describe('useFilterTypes hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should initially render with empty selectedTypes and no error', () => {
    const { result } = renderHook(() => useFilterTypes({ setFilter: vi.fn() }))

    expect(result.current.pokemonTypes).toEqual([])
    expect(result.current.error).toBeNull()
    expect(result.current.selectedTypes).toEqual([])
  })

  it('should update selectedTypes on handleTypeChange', () => {
    const { result } = renderHook(() => useFilterTypes({ setFilter: vi.fn() }))

    result.current.handleTypeChange('fire')
    expect(result.current.selectedTypes).toEqual(['fire'])

    result.current.handleTypeChange('fire')
    expect(result.current.selectedTypes).toEqual([])
  })

  it('should clear selectedTypes on clearFilter', () => {
    const { result } = renderHook(() => useFilterTypes({ setFilter: vi.fn() }))

    result.current.handleTypeChange('fire')
    result.current.handleTypeChange('water')
    expect(result.current.selectedTypes).toEqual(['fire', 'water'])

    result.current.clearFilter()
    expect(result.current.selectedTypes).toEqual([])
  })

  it('should call setFilter with updated selectedTypes on change', () => {
    const mockSetFilter = vi.fn()
    const { result } = renderHook(() =>
      useFilterTypes({ setFilter: mockSetFilter })
    )

    result.current.handleTypeChange('fire')
    expect(result.current.selectedTypes).toEqual(['fire'])
    expect(mockSetFilter).toBeCalled()

    result.current.handleTypeChange('water')
    expect(result.current.selectedTypes).toEqual(['fire', 'water'])
  })
})
