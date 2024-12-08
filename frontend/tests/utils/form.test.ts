import { validateNonNegative } from '@eco/utils/form'
import { describe, expect, it } from 'vitest'

describe('validateNonNegative', () => {
  it('should return an error message if the number is less than zero', () => {
    // arrange/ act
    const result = validateNonNegative('field', -10)

    // assert
    expect(result).toBe('The field should be greather than or equal to zero')
  })

  it('should not return undefined if the number is greather than or equal to zero', () => {
    // arrange/ act
    const withZero = validateNonNegative('foo', 0)
    const greatherThanZero = validateNonNegative('bar', 100)

    // assert
    expect(withZero).toBeUndefined()
    expect(greatherThanZero).toBeUndefined()
  })
})
