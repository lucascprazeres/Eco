import { ZodError } from 'zod'

type FieldError = {
  field: string
  message: string
}

export enum ErrorEnum {
  BadRequest = 'BAD_REQUEST',
}

export class AppError extends Error {
  fieldErrors: FieldError[]

  constructor(message: string, zodError: ZodError) {
    super(message)
    this.name = 'AppError'
    this.fieldErrors = zodError.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }))
  }
}
