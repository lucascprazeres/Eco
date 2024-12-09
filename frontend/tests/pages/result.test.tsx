import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, vi, expect, beforeEach } from 'vitest'
import Result from '@eco/pages/result'
import { useFootprint } from '@eco/providers/footprint-provider'
import { footprintMock } from '../mocks/footprint'
import mockRouter from 'next-router-mock'

vi.mock('@eco/providers/footprint-provider', () => ({
  useFootprint: vi.fn(),
}))

vi.mock('next/router', () => vi.importActual('next-router-mock'))

vi.mock('@eco/components/footprint-table', () => ({
  FootprintTable: () => <div>Mocked FootprintTable</div>,
}))
vi.mock('@eco/components/footprint-pie-chart', () => ({
  FootprintPieChart: () => <div>Mocked FootprintPieChart</div>,
}))

describe('Result Page', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to redirect user if footprint is empty', () => {
    // arrange
    // @ts-expect-error disabled warning because typescript doesn't recognize the hook is mocked
    useFootprint.mockReturnValue({
      footprint: null,
    })

    // act
    render(<Result />)

    // assert
    expect(mockRouter).toMatchObject({
      pathname: '/',
    })
  })

  it('should render the page with a footprint', () => {
    // arrange
    // @ts-expect-error disabled warning because typescript doesn't recognize the hook is mocked
    useFootprint.mockReturnValue({
      footprint: footprintMock,
    })

    // act
    const result = render(<Result />)

    // assert
    expect(
      screen.getByText('This is your Carbon Footprint'),
    ).toBeInTheDocument()

    expect(screen.getByText('Mocked FootprintTable')).toBeInTheDocument()

    expect(screen.getByText('Mocked FootprintPieChart')).toBeInTheDocument()
    expect(
      screen.getByText('Congratulations! You took the first step'),
    ).toBeInTheDocument()

    expect(result).toMatchSnapshot()
  })

  it('should navigate to CALCULATOR_PAGE when "Try again!" button is clicked', () => {
    // arrange
    // @ts-expect-error disabled warning because typescript doesn't recognize the hook is mocked
    useFootprint.mockReturnValue({
      footprint: footprintMock,
    })

    // act
    render(<Result />)

    fireEvent.click(screen.getByText('Try again!'))

    // assert
    expect(mockRouter).toMatchObject({
      pathname: '/calculator',
    })
  })
})
