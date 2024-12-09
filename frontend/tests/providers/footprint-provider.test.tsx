import { renderHook, act, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  FootprintProvider,
  useFootprint,
} from '@eco/providers/footprint-provider'
import { useMutation } from '@apollo/client'
import { footprintInputMock, footprintMock } from '../mocks/footprint'

vi.mock('@apollo/client', async () => {
  const actual = await vi.importActual('@apollo/client')
  return {
    ...actual,
    useMutation: vi.fn(() => [vi.fn()]),
  }
})

const mockFootprintResponse = {
  calculateFootprint: footprintMock,
}

describe('FootprintProvider', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to set a default value for footprint', () => {
    // arrange/ act
    const { result } = renderHook(() => useFootprint(), {
      wrapper: FootprintProvider,
    })

    // assert
    expect(result.current.footprint).toBeNull()
  })

  it('should call the GraphQL mutation and update the footprint', async () => {
    // arrange
    const mockCalculateFootprint = vi.fn().mockResolvedValue({
      data: mockFootprintResponse,
    })

    // @ts-expect-error disabled warning because typescript doesn't recognize the lib is mocked
    useMutation.mockReturnValue([mockCalculateFootprint])

    // act
    const { result } = renderHook(() => useFootprint(), {
      wrapper: FootprintProvider,
    })

    await act(async () => {
      await result.current.handleCalculateFootprint(footprintInputMock)
    })

    // assert
    expect(mockCalculateFootprint).toHaveBeenCalledWith({
      variables: { input: footprintInputMock },
    })
    expect(result.current.footprint).toEqual(
      mockFootprintResponse.calculateFootprint,
    )
  })

  it('should handle errors gracefully', async () => {
    // arrange
    const mockCalculateFootprint = vi
      .fn()
      .mockRejectedValue(new Error('GraphQL mutation failed'))

    // @ts-expect-error disabled warning because typescript doesn't recognize the lib is mocked
    useMutation.mockReturnValue([mockCalculateFootprint])

    // act
    const { result } = renderHook(() => useFootprint(), {
      wrapper: FootprintProvider,
    })

    await act(async () => {
      await expect(
        result.current.handleCalculateFootprint(footprintInputMock),
      ).rejects.toThrow('GraphQL mutation failed')
    })

    // assert
    expect(mockCalculateFootprint).toHaveBeenCalledWith({
      variables: { input: footprintInputMock },
    })
    expect(result.current.footprint).toBeNull()
  })
})
