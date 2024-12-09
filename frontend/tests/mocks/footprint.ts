import { FuelTypeEnum } from '@eco/models/carbon-footprint'

export const footprintMock = {
  electricity: { value: 1200, unit: 'kgCO2e/year' },
  transportation: { value: 150, unit: 'kgCO2e/year' },
  airTravel: { value: 100, unit: 'kgCO2e/year' },
  total: { value: 2000, unit: 'kgCO2e/year' },
}

export const footprintInputMock = {
  airTravelsPerYear: 5,
  electricityUsageKWhPerMonth: 1200,
  transportationFuelGallonsPerMonth: 100,
  transportationFuelType: FuelTypeEnum.Diesel,
}
