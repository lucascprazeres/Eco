import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { FootprintPieChart } from '@eco/components/footprint-pie-chart'
import { useFootprint } from '@eco/providers/footprint-provider'
import * as utils from '@eco/utils/percentage'
import { footprintMock } from '../mocks/footprint'

vi.mock('@eco/providers/footprint-provider')

describe('FootprintPieChart', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to render correctly', () => {
    // arrange
    const toPercentageSpy = vi.spyOn(utils, 'toPercentage')

    // @ts-expect-error disabled warning because typescript doesn't recognize the lib is mocked
    useFootprint.mockReturnValueOnce({
      footprint: footprintMock,
    })

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
    // @ts-expect-error disabled warning because typescript doesn't recognize the lib is mocked
    useFootprint.mockReturnValue({ footprint: null })

    // act
    render(<FootprintPieChart />)

    // assert
    expect(screen.getByText('No data to display')).toBeInTheDocument()
  })
})
