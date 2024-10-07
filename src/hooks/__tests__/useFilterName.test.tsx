import { vi, describe, it, expect } from 'vitest'
import { useFilterName } from '../useFilterName'

describe('useFilterName hook', () => {
  it('should call setFilter with the correct name', () => {
    const setFilterMock = vi.fn()
    const { handleNameFilter } = useFilterName({ setFilter: setFilterMock })

    handleNameFilter('Pikachu')

    expect(setFilterMock).toHaveBeenCalledWith({ name: 'Pikachu' })
  })
})
