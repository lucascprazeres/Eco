import { describe, it, expect, vi, Mock, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { EnergyPanel } from '@eco/components/tab-panels/energy'
import { useFormContext } from 'react-hook-form'
import { useFormContextMockReturn } from '../../mocks/react-hook-form'

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(() => useFormContextMockReturn),
}))

describe('EnergyPanel', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to render correclty', () => {
    // arrange
    const mockOnClickNext = vi.fn()

    // act
    const result = render(<EnergyPanel onClickNext={mockOnClickNext} />)

    const title = screen.getByText(/Enter your monthly electricity usage/i)
    const input = screen.getByLabelText(/Electricity usage/i)
    const button = screen.getByRole('button', { name: /Next/i })

    // assert
    expect(title).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(result).toMatchSnapshot()
  })

  it('should be able to display validation errors', () => {
    // arrange
    // eslint-disable-next-line prettier/prettier
    (useFormContext as Mock).mockReturnValueOnce({
      ...useFormContextMockReturn,
      formState: {
        errors: {
          electricityUsageKWhPerMonth: { message: 'Validation error' },
        },
      },
    })

    // act
    render(<EnergyPanel onClickNext={vi.fn()} />)

    const button = screen.getByRole('button', { name: /Next/i })
    const helperText = screen.getByText(/Validation error/i)

    // assert
    expect(button).toBeDisabled()
    expect(helperText).toBeInTheDocument()
  })

  it('should call onClickNext when the form is submitted without errors', () => {
    // arrange
    const mockOnClickNext = vi.fn()

    // act
    render(<EnergyPanel onClickNext={mockOnClickNext} />)

    const button = screen.getByRole('button', { name: /Next/i })
    fireEvent.submit(button)

    // assert
    expect(mockOnClickNext).toHaveBeenCalledTimes(1)
  })
})
