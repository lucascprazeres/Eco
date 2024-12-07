import { DefaultLayout } from '@eco/components/default-layout'
import { EnergyPanel } from '@eco/components/tab-panels/energy'
import { TransportationPanel } from '@eco/components/tab-panels/transportation'
import { TravelPanel } from '@eco/components/tab-panels/travels'
import { CarbonFootprintInput, TabsEnum } from '@eco/models/carbon-footprint'
import { useFootprint } from '@eco/providers/footprint-provider'
import { TabContext, TabList } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function Calculator() {
  const [tab, setCurrentTab] = useState(0)

  const form = useForm<CarbonFootprintInput>({
    mode: 'onSubmit',
  })

  const { handleCalculateFootprint } = useFootprint()

  return (
    <DefaultLayout>
      <Box
        bgcolor="white"
        borderRadius={2}
        width={700}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <FormProvider {...form}>
          <TabContext value={tab}>
            <TabList onChange={(_, next) => setCurrentTab(next)}>
              <Tab label="Energy" value={TabsEnum.EnergyUsage} />
              <Tab label="Transport" value={TabsEnum.Transporation} />
              <Tab label="Travel" value={TabsEnum.Travel} />
            </TabList>

            <EnergyPanel
              onClickNext={() => setCurrentTab(TabsEnum.Transporation)}
            />
            <TransportationPanel
              onClickNext={() => setCurrentTab(TabsEnum.Travel)}
              onGoBack={() => setCurrentTab(TabsEnum.EnergyUsage)}
            />
            <TravelPanel
              onGoBack={() => setCurrentTab(TabsEnum.Transporation)}
              onSubmit={handleCalculateFootprint}
            />
          </TabContext>
        </FormProvider>
      </Box>
    </DefaultLayout>
  )
}
