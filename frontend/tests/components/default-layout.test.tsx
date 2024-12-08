import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { DefaultLayout } from '@eco/components/default-layout'

describe('DefaultLayout', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should be able to render correcly', () => {
    // arrange/ act
    const result = render(
      <DefaultLayout>
        <div>Test Content</div>
      </DefaultLayout>,
    )

    // assert
    const child = screen.getByText('Test Content')

    expect(child).toBeInTheDocument()
    expect(result).toMatchSnapshot()
  })
})
