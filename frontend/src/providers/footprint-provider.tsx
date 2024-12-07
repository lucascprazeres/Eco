import { useMutation } from '@apollo/client'
import { CALCULATE_CARBON_FOOTPRINT } from '@eco/graphql/mutation'
import {
  CalculateFootprintMutationOutput,
  CarbonFootprint,
  CarbonFootprintInput,
} from '@eco/models/carbon-footprint'
import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react'

interface FootprintContextData {
  footprint: CarbonFootprint
  handleCalculateFootprint: (data: CarbonFootprintInput) => void
}

interface FootprintProviderProps {
  children: ReactElement | ReactElement[]
}

const FootprintContext = createContext<FootprintContextData>(
  {} as FootprintContextData,
)

export function FootprintProvider({ children }: FootprintProviderProps) {
  const [footprint, setFootprint] = useState<CarbonFootprint>(
    {} as CarbonFootprint,
  )

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

      setFootprint(data?.calculateFootprint as any)
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
