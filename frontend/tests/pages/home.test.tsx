import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import routerMock from 'next-router-mock'
import Home from '@eco/pages'

vi.mock('next/router', () => vi.importActual('next-router-mock'))

describe('Home Page', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able to render correctly', () => {
    // arrange/ act
    render(<Home />)

    // assert
    expect(
      screen.getByText("Let's calculate your carbon footprint!"),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Follow these steps to know how your daily actions impact our environment and',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('be the change.')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'GET STARTED' }),
    ).toBeInTheDocument()
  })

  it('should navigate to the calculator page when "GET STARTED" button is clicked', () => {
    // arrange
    render(<Home />)

    const button = screen.getByRole('button', { name: 'GET STARTED' })

    // act
    fireEvent.click(button)

    // assert
    expect(routerMock).toMatchObject({
      pathname: '/calculator',
    })
  })
})
