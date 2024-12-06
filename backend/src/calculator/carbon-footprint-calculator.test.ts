import { describe, it, expect } from "vitest";
import { createFootprintCalculator } from "./carbon-footprint-calculator";

describe('Footprint Calculator', () => {
    it('should to return a calculator instance', () => {
        // arrange/ act
        const calculator = createFootprintCalculator()

        // assert
        expect(calculator).toHaveProperty('calculate')
    })

    it('should return a footprint if all params are provided', () => {
        // arrange
        const calculator = createFootprintCalculator()

        // act
        const footprint = calculator.calculate({
            airTravelsPerYear: 1,
            electricityUsageKWhPerMonth: 100,
            transportationFuelGallonsPerMonth: 10,
            transportationFuelType: 'gasoline'
        })

        // assert
        expect(footprint.electricity).toEqual({
            unit: 'kgCO2e/year',
            value: 511.2,
        })
        expect(footprint.transportation).toEqual({
            value: 1053.6,
            unit: 'kgCO2e/year'
        })
        expect(footprint.airTravel).toEqual({
            value: 0.207,
            unit: 'kgCO2e/year'
        })
        expect(footprint.total).toEqual({
            value: 1564.8,
            unit: 'kgCO2e/year'
        })
    })

    it('should return zero if all params are zero', () => {
        // arrange
        const calculator = createFootprintCalculator()

        // act
        const footprint = calculator.calculate({
            airTravelsPerYear: 0,
            electricityUsageKWhPerMonth: 0,
            transportationFuelGallonsPerMonth: 0,
            transportationFuelType: 'gasoline'
        })

        // assert
        expect(footprint.electricity).toEqual({
            unit: 'kgCO2e/year',
            value: 0,
        })
        expect(footprint.transportation).toEqual({
            value: 0,
            unit: 'kgCO2e/year'
        })
        expect(footprint.airTravel).toEqual({
            value: 0,
            unit: 'kgCO2e/year'
        })
        expect(footprint.total).toEqual({
            value: 0,
            unit: 'kgCO2e/year'
        })
    })
})