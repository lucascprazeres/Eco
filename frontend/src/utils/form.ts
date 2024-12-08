export function validateNonNegative(fieldname: string, value: number) {
  if (value < 0) {
    return `The ${fieldname} should be greather than or equal to zero`
  }
}
