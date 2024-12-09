import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { FootprintTable } from '@eco/components/footprint-table'
import { useFootprint } from '@eco/providers/footprint-provider'
import { footprintMock } from '../mocks/footprint'

vi.mock('@eco/providers/footprint-provider')

describe('FootprintTable', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to render correctly', () => {
    // arrange
    // @ts-expect-error disabled warning because typescript doesn't recognize the hook is mocked
    useFootprint.mockReturnValueOnce({
      footprint: footprintMock,
    })

    // act
    const result = render(<FootprintTable />)

    // assert
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Emission')).toBeInTheDocument()

    expect(screen.getByText('Electricity Usage (Kwh/year)')).toBeInTheDocument()
    expect(screen.getByText('1200 kgCO2e/year')).toBeInTheDocument()

    expect(
      screen.getByText('Transportation fuel (Gallons/year)'),
    ).toBeInTheDocument()
    expect(screen.getByText('150 kgCO2e/year')).toBeInTheDocument()

    expect(screen.getByText('Air travel (travels/year)')).toBeInTheDocument()
    expect(screen.getByText('100 kgCO2e/year')).toBeInTheDocument()

    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('2000 kgCO2e/year')).toBeInTheDocument()

    expect(result).toMatchSnapshot()
  })

  it('should be able to handle an empty footprint', () => {
    // arrange
    // @ts-expect-error disabled warning because typescript doesn't recognize the lib is mocked
    useFootprint.mockReturnValue({ footprint: null })

    // act
    render(<FootprintTable />)

    // assert
    expect(
      screen.queryByText('Electricity Usage  (Kwh/year)'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Transportation fuel  (Gallons/year)'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Air travel  (travels/year)'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Total')).not.toBeInTheDocument()
  })
})
