import { gql } from '@apollo/client'

export const CALCULATE_CARBON_FOOTPRINT = gql`
  fragment CarbonEmissionFragment on CarbonEmission {
    unit
    value
  }

  mutation CALCULATE_FOOTPRINT_MUTATION($input: CalculateFootprintInput!) {
    calculateFootprint(input: $input) {
      electricity {
        ...CarbonEmissionFragment
      }
      transportation {
        ...CarbonEmissionFragment
      }
      airTravel {
        ...CarbonEmissionFragment
      }
      total {
        ...CarbonEmissionFragment
      }
    }
  }
`
