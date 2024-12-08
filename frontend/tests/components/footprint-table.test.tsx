import { describe, it, expect, vi, afterEach, Mock } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { FootprintTable } from '@eco/components/footprint-table'
import { useFootprint } from '@eco/providers/footprint-provider'

vi.mock('@eco/providers/footprint-provider')

describe('FootprintTable', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to render correctly', () => {
    // arrange
    // eslint-disable-next-line prettier/prettier
    (useFootprint as Mock).mockReturnValueOnce({
      footprint: {
        electricity: { value: 1200, unit: 'kgCO2e/year' },
        transportation: { value: 150, unit: 'kgCO2e/year' },
        airTravel: { value: 100, unit: 'kgCO2e/year' },
        total: { value: 2000, unit: 'kgCO2e/year' },
      },
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
    // eslint-disable-next-line prettier/prettier
    (useFootprint as Mock).mockReturnValue({ footprint: null })

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
