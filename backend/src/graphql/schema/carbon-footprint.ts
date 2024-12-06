import { createFootprintCalculator } from '@eco/calculator/carbon-footprint-calculator'
import { CalculateFootprintInput } from '@eco/models/carbon-footprint'
import { AppError } from '@eco/models/error'
import { GraphQLError } from 'graphql'

export const carbonFootprintTypeDefs = `#graphql
    type Query {
      hello: String
    }

    type Mutation {
      calculateFootprint(input: CalculateFootprintInput!): CalculateFootprintOutput!
    }

    input CalculateFootprintInput {
      transportationFuelType: FuelType!
      transportationFuelGallonsPerMonth: Float!
      electricityUsageKWhPerMonth: Float!
      airTravelsPerYear: Float!
    }

    type CalculateFootprintOutput {
      electricity: CarbonEmission
      transportation: CarbonEmission
      airTravel: CarbonEmission
      total: CarbonEmission
    }

    enum FuelType {
      gasoline
      diesel
      ethanol
    }

    type CarbonEmission {
      value: Float
      unit: String
    }
`

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
        calculator.calculate(input)
      } catch (error) {
        if (error instanceof AppError) {
          throw new GraphQLError(error.message, {
            extensions: { fieldErrors: error.fieldErrors },
          })
        }
      }
    },
  },
}
