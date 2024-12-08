import { describe, it, expect, vi, afterEach, Mock } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { FootprintPieChart } from '@eco/components/footprint-pie-chart'
import { useFootprint } from '@eco/providers/footprint-provider'
import * as utils from '@eco/utils/percentage'

vi.mock('@eco/providers/footprint-provider')

describe('FootprintPieChart', () => {
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

    const toPercentageSpy = vi.spyOn(utils, 'toPercentage')

    // act
    const result = render(<FootprintPieChart />)

    const electricityLabel = screen.getAllByText('Electricity Usage (%)')[0]
    const transportationLabel = screen.getAllByText(
      'Transportation fuel (%)',
    )[0]
    const travelLabel = screen.getAllByText('Air travel (%)')[0]

    // assert
    expect(electricityLabel).toBeInTheDocument()
    expect(transportationLabel).toBeInTheDocument()
    expect(travelLabel).toBeInTheDocument()

    expect(toPercentageSpy).toHaveBeenCalledWith(1200, 2000)
    expect(toPercentageSpy).toHaveBeenCalledWith(150, 2000)
    expect(toPercentageSpy).toHaveBeenCalledWith(100, 2000)

    expect(result).toMatchSnapshot()
  })

  it('should be able to handle an empty footprint', () => {
    // arrange
    // eslint-disable-next-line prettier/prettier
    (useFootprint as Mock).mockReturnValue({ footprint: null })

    // act
    render(<FootprintPieChart />)

    // assert
    expect(screen.getByText('No data to display')).toBeInTheDocument()
  })
})
