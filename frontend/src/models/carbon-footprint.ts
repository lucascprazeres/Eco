export type CarbonEmission = {
  unit: string
  value: number
}

export type CarbonFootprint = {
  electricity: CarbonEmission
  transportation: CarbonEmission
  airTravel: CarbonEmission
  total: CarbonEmission
}

export type CarbonFootprintInput = {
  transportationFuelType: FuelTypeEnum
  transportationFuelGallonsPerMonth: number
  electricityUsageKWhPerMonth: number
  airTravelsPerYear: number
}

export enum FuelTypeEnum {
  Gasoline = 'gasoline',
  Diesel = 'diesel',
  Ethanol = 'ethanol'
}

export interface CalculateFootprintMutationInput {
  input: CarbonFootprintInput
}

export interface CalculateFootprintMutationOutput {
  calculateFootprint: CarbonFootprint
}

export enum TabsEnum {
  EnergyUsage = 0,
  Transporation = 1,
  Travel = 2
}
