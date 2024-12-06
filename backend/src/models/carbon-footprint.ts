export type FuelType = 'gasoline' | 'diesel' | 'ethanol'

export interface CalculateFootprintInput {
    transportationFuelType: FuelType
    transportationFuelGallonsPerMonth: number
    electricityUsageKWhPerMonth: number
    airTravelsPerYear: number
}

export interface CalculateFootprintOutput {
    electricity: CarbonEmission
    transportation: CarbonEmission
    airTravel: CarbonEmission
    total: CarbonEmission
}

type CarbonEmission = {
    value: number
    unit: string
}
