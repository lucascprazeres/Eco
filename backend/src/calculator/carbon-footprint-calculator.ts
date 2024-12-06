import {
  CalculateFootprintInput,
  CalculateFootprintOutput,
} from '@eco/models/carbon-footprint'
import { AppError } from '@eco/models/error'

import { z, ZodError } from 'zod'

export function createFootprintCalculator() {
  const yearlyEmissionsFactor = 12 // months in a year
  const electricityUsageFactor = 0.426 // kg/kWh CO2 (US average)
  const airTravelFactor = 0.207 // kg C02 per travel
  const transportationFactors = {
    // kg CO2 per gallon
    gasoline: 8.78,
    diesel: 10.21,
    ethanol: 5.75,
  }

  const calculateInputSchema = z.object({
    electricityUsageKWhPerMonth: z.number().nonnegative(),
    transportationFuelType: z.string(),
    transportationFuelGallonsPerMonth: z.number().nonnegative(),
    airTravelsPerYear: z.number().nonnegative(),
  })

  function calculate(input: CalculateFootprintInput): CalculateFootprintOutput {
    try {
      calculateInputSchema.parse(input)

      const {
        electricityUsageKWhPerMonth,
        transportationFuelType,
        transportationFuelGallonsPerMonth,
        airTravelsPerYear,
      } = input

      const electricityEmissionsPerYear =
        electricityUsageKWhPerMonth *
        electricityUsageFactor *
        yearlyEmissionsFactor

      const transportationFactor =
        transportationFactors[transportationFuelType] || 0
      const transportationEmissionsPerYear =
        transportationFuelGallonsPerMonth *
        transportationFactor *
        yearlyEmissionsFactor

      const airTravelEmissionsPerYear = airTravelsPerYear * airTravelFactor

      const totalYearlyEmissions =
        electricityEmissionsPerYear + transportationEmissionsPerYear

      return {
        electricity: {
          value: round(electricityEmissionsPerYear, 3),
          unit: 'kgCO2e/year',
        },
        transportation: {
          value: round(transportationEmissionsPerYear, 3),
          unit: 'kgCO2e/year',
        },
        airTravel: {
          value: round(airTravelEmissionsPerYear, 3),
          unit: 'kgCO2e/year',
        },
        total: { value: round(totalYearlyEmissions, 3), unit: 'kgCO2e/year' },
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppError('Invalid params', error)
      }

      console.log('error: ', error)
      throw error
    }
  }

  function round(value: number, decimalPlaces: number) {
    return Number(value.toFixed(decimalPlaces))
  }

  return {
    calculate,
  }
}
