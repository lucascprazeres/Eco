import { describe, it, expect, vi, Mock, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { TransportationPanel } from '@eco/components/tab-panels/transportation'
import { useFormContext, useController } from 'react-hook-form'
import {
  useControllerMockReturn,
  useFormContextMockReturn,
} from '../../mocks/react-hook-form'

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(() => useFormContextMockReturn),
  useController: vi.fn(() => useControllerMockReturn),
}))

describe('TransportationPanel', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able to render correctly', () => {
    // arrange
    const mockOnClickNext = vi.fn()
    const mockOnGoBack = vi.fn()

    // act
    const result = render(
      <TransportationPanel
        onClickNext={mockOnClickNext}
        onGoBack={mockOnGoBack}
      />,
    )

    const fuelTypeTitle = screen.getByText(
      /What type of fuel does your vehicle use\?/i,
    )
    const fuelUsageTitle = screen.getByText(
      /How many gallons of fuel do you use in a month\?/i,
    )
    const fuelInput = screen.getByLabelText(/Fuel \(gallons\)/i)
    const nextButton = screen.getByRole('button', { name: /Next/i })
    const backButton = screen.getByRole('button', { name: /Go back/i })

    // assert
    expect(fuelTypeTitle).toBeInTheDocument()
    expect(fuelUsageTitle).toBeInTheDocument()
    expect(fuelInput).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
    expect(nextButton).not.toBeDisabled()
    expect(result).toMatchSnapshot()
  })

  it('should be able to display validation error for fuel type', () => {
    // arrange
    // eslint-disable-next-line prettier/prettier
    (useController as Mock).mockReturnValueOnce({
      ...useControllerMockReturn,
      fieldState: { error: { message: 'Please select at least one option' } },
    })

    // act
    render(<TransportationPanel onClickNext={vi.fn()} onGoBack={vi.fn()} />)

    const helperText = screen.getByText(/Please select at least one option/i)

    // assert
    expect(helperText).toBeInTheDocument()
  })

  it('should display validation error for fuel usage', () => {
    // arrange
    // eslint-disable-next-line prettier/prettier
    (useFormContext as Mock).mockReturnValueOnce({
      ...useFormContextMockReturn,
      formState: {
        errors: {
          transportationFuelGallonsPerMonth: {
            message: 'Please insert your fuel usage (or 0 if none)',
          },
        },
      },
    })

    // act
    render(<TransportationPanel onClickNext={vi.fn()} onGoBack={vi.fn()} />)

    const helperText = screen.getByText(
      /Please insert your fuel usage \(or 0 if none\)/i,
    )

    // assert
    expect(helperText).toBeInTheDocument()
  })

  it('should call onClickNext when form is submitted without errors', () => {
    // arrange
    const mockOnClickNext = vi.fn()

    // act
    render(
      <TransportationPanel onClickNext={mockOnClickNext} onGoBack={vi.fn()} />,
    )

    const nextButton = screen.getByRole('button', { name: /Next/i })
    fireEvent.submit(nextButton)

    // assert
    expect(mockOnClickNext).toHaveBeenCalledTimes(1)
  })

  it('should call onGoBack when back button is clicked', () => {
    // arrange
    const mockOnGoBack = vi.fn()

    // act
    render(
      <TransportationPanel onClickNext={vi.fn()} onGoBack={mockOnGoBack} />,
    )

    const backButton = screen.getByRole('button', { name: /Go back/i })
    fireEvent.click(backButton)

    // assert
    expect(mockOnGoBack).toHaveBeenCalledTimes(1)
  })
})
