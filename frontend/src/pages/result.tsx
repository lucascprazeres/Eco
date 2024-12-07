import { DefaultLayout } from '@eco/components/default-layout'
import { useFootprint } from '@eco/providers/footprint-provider'
import { Box, Typography, Button } from '@mui/material'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

import smileEmoji from '@eco/assets/smile.svg'
import Image from 'next/image'
import { CALCULATOR_PAGE, HOME_PAGE } from '@eco/constants/routes'
import { FootprintTable } from '@eco/components/footprint-table'
import { FootprintPieChart } from '@eco/components/footprint-pie-chart'

export default function Result() {
  const router = useRouter()
  const { footprint } = useFootprint()

  useEffect(() => {
    if (!footprint) {
      router.push(HOME_PAGE)
    }
  }, [footprint, router])

  return (
    <DefaultLayout>
      <Box
        bgcolor="white"
        height="auto"
        width="80%"
        padding={4}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="h5"
            fontFamily="ubuntu"
            fontWeight="bold"
            color="secondary.dark"
          >
            This is your Carbon Footprint
          </Typography>
          <Image src={smileEmoji} alt="" width={32} height={32} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <FootprintPieChart />
          <FootprintTable />
        </Box>

        <Box>
          <Typography
            variant="h6"
            fontFamily="ubuntu"
            fontWeight="bold"
            color="secondary.dark"
            marginBottom={1}
          >
            Congratulations! You took the first step
          </Typography>
          <Typography fontFamily="roboto">
            Your carbon footprint is a snapshot of your current environmental
            impact. Small changes in your daily habits—like using public
            transport, reducing energy consumption, or cutting food waste—can
            make a big difference. Try adjusting your behavior and come back to
            see how your footprint improves.
          </Typography>
        </Box>

        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          marginTop={2}
        >
          <Button
            type="button"
            variant="contained"
            sx={{ height: 54, fontWeight: 'bold' }}
            onClick={() => router.replace(CALCULATOR_PAGE)}
          >
            Try again!
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  )
}
