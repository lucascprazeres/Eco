import { FormEvent } from 'react'
import { vi } from 'vitest'

const handleSubmit = vi.fn((callback) => (event: FormEvent) => {
  event.preventDefault()
  callback()
})

export const useFormContextMockReturn = {
  register: vi.fn(),
  formState: { errors: {} },
  handleSubmit,
  control: {},
}

export const useControllerMockReturn = {
  field: { value: '', onChange: vi.fn() },
  fieldState: {},
}
