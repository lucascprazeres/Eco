import { useMutation } from '@apollo/client'
import { CALCULATE_CARBON_FOOTPRINT } from '@eco/graphql/mutation'
import {
  CalculateFootprintMutationOutput,
  CarbonFootprint,
  CarbonFootprintInput,
} from '@eco/models/carbon-footprint'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'

interface FootprintContextData {
  footprint: CarbonFootprint | null
  handleCalculateFootprint: (data: CarbonFootprintInput) => Promise<void>
}

const FootprintContext = createContext<FootprintContextData>(
  {} as FootprintContextData,
)

export function FootprintProvider({ children }: PropsWithChildren) {
  const [footprint, setFootprint] = useState<CarbonFootprint | null>(null)

  const [calculateFootprint] = useMutation<CalculateFootprintMutationOutput>(
    CALCULATE_CARBON_FOOTPRINT,
  )

  const handleCalculateFootprint = useCallback(
    async (formData: CarbonFootprintInput) => {
      const { data } = await calculateFootprint({
        variables: {
          input: formData,
        },
      })

      setFootprint(data?.calculateFootprint as unknown as CarbonFootprint)
    },
    [calculateFootprint],
  )

  return (
    <FootprintContext.Provider value={{ footprint, handleCalculateFootprint }}>
      {children}
    </FootprintContext.Provider>
  )
}

export const useFootprint = () => useContext(FootprintContext)
