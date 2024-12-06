import { createApolloServer } from '@eco/graphql/server'
import { CalculateFootprintInput } from '@eco/models/carbon-footprint'
import { describe, it, assert, expect } from 'vitest'

describe('GraphQL Server', () => {
  it('should respond to the hello world query', async () => {
    // arrange
    const server = createApolloServer()

    // act
    const response = await server.executeOperation({
      query: 'query { hello }',
    })

    // assert
    assert(response.body.kind === 'single')
    expect(response.body.singleResult.data).toEqual({ hello: 'hello world' })
    expect(response.body.singleResult.errors).toBeUndefined()
  })

  it('should respond to the calculateFootprint mutation with valid params', async () => {
    // arrange
    const server = createApolloServer()
    const input: CalculateFootprintInput = {
      electricityUsageKWhPerMonth: 100,
      transportationFuelGallonsPerMonth: 10,
      transportationFuelType: 'ethanol',
      airTravelsPerYear: 2,
    }

    // act
    const response = await server.executeOperation({
      query: `
        mutation calculateFootprint($input: CalculateFootprintInput!) {
          calculateFootprint(input: $input) {
            electricity { value unit }
            transportation { value unit }
            airTravel { value unit }
            total { value unit }
          }
        }
      `,
      variables: {
        input,
      },
    })

    // assert
    assert(response.body.kind === 'single')
    expect(response.body.singleResult.data).toEqual({
      calculateFootprint: {
        airTravel: {
          unit: 'kgCO2e/year',
          value: 0.414,
        },
        electricity: {
          unit: 'kgCO2e/year',
          value: 511.2,
        },
        transportation: {
          unit: 'kgCO2e/year',
          value: 690,
        },
        total: {
          unit: 'kgCO2e/year',
          value: 1201.2,
        },
      },
    })
    expect(response.body.singleResult.errors).toBeUndefined()
  })

  it('should respond to the calculateFootprint mutation with invalid params', async () => {
    // arrange
    const server = createApolloServer()
    const input: CalculateFootprintInput = {
      electricityUsageKWhPerMonth: -100,
      transportationFuelGallonsPerMonth: -2,
      transportationFuelType: 'ethanol',
      airTravelsPerYear: -1,
    }

    // act
    const response = await server.executeOperation({
      query: `
        mutation calculateFootprint($input: CalculateFootprintInput!) {
          calculateFootprint(input: $input) {
            electricity { value unit }
            transportation { value unit }
            airTravel { value unit }
            total { value unit }
          }
        }
      `,
      variables: {
        input,
      },
    })

    // assert
    assert(response.body.kind === 'single')
    expect(response.body.singleResult.errors).toEqual([
      {
        extensions: {
          code: 422,
          fieldErrors: [
            {
              field: 'electricityUsageKWhPerMonth',
              message: 'Number must be greater than or equal to 0',
            },
            {
              field: 'transportationFuelGallonsPerMonth',
              message: 'Number must be greater than or equal to 0',
            },
            {
              field: 'airTravelsPerYear',
              message: 'Number must be greater than or equal to 0',
            },
          ],
        },
        locations: [
          {
            column: 11,
            line: 3,
          },
        ],
        message: 'Invalid params',
        path: ['calculateFootprint'],
      },
    ])
    expect(response.body.singleResult.data?.calculateFootprint).toBeNull()
  })
})
