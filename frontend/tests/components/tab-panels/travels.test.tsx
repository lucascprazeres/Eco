import { describe, it, expect, vi, afterEach, Mock } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react'
import { TravelPanel } from '@eco/components/tab-panels/travels'
import { useFormContext } from 'react-hook-form'
import { useFormContextMockReturn } from '../../mocks/react-hook-form'
import mockRouter from 'next-router-mock'

vi.mock('next/router', () => vi.importActual('next-router-mock'))

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(() => useFormContextMockReturn),
}))

describe('TravelPanel', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to render correctly', () => {
    // arrange
    const mockOnGoBack = vi.fn()
    const mockOnSubmit = vi.fn()

    // act
    render(<TravelPanel onGoBack={mockOnGoBack} onSubmit={mockOnSubmit} />)

    const title = screen.getByText(/How many flights do you take per year\?/i)
    const input = screen.getByLabelText(/Flights \(per year\)/i)
    const backButton = screen.getByRole('button', { name: /Go back/i })
    const nextButton = screen.getByRole('button', { name: /Next/i })

    // assert
    expect(title).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).not.toBeDisabled()
  })

  it('should be able to display validation error for invalid input', () => {
    // arrange
    // eslint-disable-next-line prettier/prettier
    (useFormContext as Mock).mockReturnValueOnce({
      register: vi.fn(),
      handleSubmit: vi.fn(),
      formState: {
        errors: {
          airTravelsPerYear: { message: 'Validation error' },
        },
      },
    })

    // act
    render(<TravelPanel onGoBack={vi.fn()} onSubmit={vi.fn()} />)

    const helperText = screen.getByText(/Validation error/i)
    const nextButton = screen.getByRole('button', { name: /Next/i })

    // assert
    expect(helperText).toBeInTheDocument()
    expect(nextButton).toBeDisabled()
  })

  it('should call onSubmit and navigate to results page when the form is submitted without errors', async () => {
    // arrange
    const mockOnSubmit = vi.fn()

    // act
    render(<TravelPanel onGoBack={vi.fn()} onSubmit={mockOnSubmit} />)

    const nextButton = screen.getByRole('button', { name: /Next/i })
    fireEvent.submit(nextButton)

    // assert
    expect(mockOnSubmit).toHaveBeenCalled()

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/result',
      }),
    )
  })

  it('should call onGoBack when the back button is clicked', () => {
    // arrange
    const mockOnGoBack = vi.fn()

    // act
    render(<TravelPanel onGoBack={mockOnGoBack} onSubmit={vi.fn()} />)

    const backButton = screen.getByRole('button', { name: /Go back/i })
    fireEvent.click(backButton)

    // assert
    expect(mockOnGoBack).toHaveBeenCalled()
  })
})
