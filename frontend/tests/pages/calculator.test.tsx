import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Calculator from '@eco/pages/calculator'

vi.mock('next/router', () => vi.importActual('next-router-mock'))

const mock = vi.hoisted(() => ({
  handleCalculateFootprint: vi.fn(),
}))

vi.mock('@eco/providers/footprint-provider', () => ({
  useFootprint: () => ({
    handleCalculateFootprint: mock.handleCalculateFootprint,
  }),
}))

const DEFAULT_INPUT_VALUE = {
  target: {
    value: '100',
  },
}

describe('Calculator Page', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    // arrange/ act
    render(<Calculator />)

    // assert
    expect(screen.getByText('Energy')).toBeInTheDocument()
    expect(screen.getByText('Transport')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
  })

  it('should be able to submit form', async () => {
    // act/ assert
    render(<Calculator />)

    // Energy tab
    const electricityInput = screen.getByLabelText(/Electricity usage/i)
    fireEvent.input(electricityInput, DEFAULT_INPUT_VALUE)

    fireEvent.click(screen.getByText('Next'))

    // Transport tab
    const transportTab = screen.getByText('Transport')
    await waitFor(() => {
      expect(transportTab).toHaveAttribute('aria-selected', 'true')
    })

    const transportType = screen.getByText('Gasoline')
    fireEvent.click(transportType)

    const transportFuelInput = screen.getByLabelText(/Fuel \(gallons\)/i)
    fireEvent.input(transportFuelInput, DEFAULT_INPUT_VALUE)

    fireEvent.click(screen.getByText('Next'))

    // Travel tab
    const travelTab = screen.getByText('Travel')
    await waitFor(() => {
      expect(travelTab).toHaveAttribute('aria-selected', 'true')
    })

    const flightsInput = screen.getByLabelText(/Flights \(per year\)/i)
    fireEvent.input(flightsInput, DEFAULT_INPUT_VALUE)

    fireEvent.click(screen.getByText('Next'))

    await waitFor(() => {
      expect(mock.handleCalculateFootprint).toHaveBeenCalledWith({
        electricityUsageKWhPerMonth: 100,
        transportationFuelType: 'gasoline',
        transportationFuelGallonsPerMonth: 100,
        airTravelsPerYear: 100,
      })
    })
  })
})
