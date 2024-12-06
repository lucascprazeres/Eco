import { createFootprintCalculator } from '@eco/calculator/carbon-footprint-calculator'
import { CalculateFootprintInput } from '@eco/models/carbon-footprint'
import { AppError } from '@eco/models/error'
import { GraphQLError } from 'graphql'

const calculator = createFootprintCalculator()

export const carbonFootprintResolver = {
  Query: {
    hello: () => 'hello world',
  },
  Mutation: {
    calculateFootprint: (
      _: unknown,
      { input }: { input: CalculateFootprintInput },
    ) => {
      try {
        return calculator.calculate(input)
      } catch (error) {
        if (error instanceof AppError) {
          throw new GraphQLError(error.message, {
            extensions: { code: 422, fieldErrors: error.fieldErrors },
          })
        }

        throw error
      }
    },
  },
}
