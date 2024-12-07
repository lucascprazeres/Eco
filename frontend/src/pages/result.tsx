import { DefaultLayout } from '@eco/components/default-layout'
import { useFootprint } from '@eco/providers/footprint-provider'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  styled,
  tableCellClasses,
  Button,
} from '@mui/material'
import { PieChart } from '@mui/x-charts'

import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'

import smileEmoji from '@eco/assets/smile.svg'
import Image from 'next/image'
import { toPercentage } from '@eco/utils/percentage'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}))

export default function Result() {
  const router = useRouter()
  const { footprint } = useFootprint()

  const footprintBreakdownRows = useMemo(() => {
    if (!footprint) return []

    return [
      {
        name: 'Electricity Usage  (Kwh/year)',
        emission: `${footprint?.electricity?.value} ${footprint?.electricity?.unit}`,
      },
      {
        name: 'Transportation fuel  (Gallons/year)',
        emission: `${footprint?.transportation?.value} ${footprint?.transportation?.unit}`,
      },
      {
        name: 'Air travel  (travels/year)',
        emission: `${footprint?.airTravel?.value} ${footprint?.airTravel?.unit}`,
      },
      {
        name: 'Total',
        emission: `${footprint?.total?.value} ${footprint?.total?.unit}`,
      },
    ]
  }, [footprint])

  const pieChartData = useMemo(() => {
    if (!footprint) return []

    return [
      {
        label: 'Electricity Usage (%)',
        value: toPercentage(footprint.electricity.value, footprint.total.value),
      },
      {
        label: 'Transportation fuel (%)',
        value: toPercentage(
          footprint.transportation.value,
          footprint.total.value,
        ),
      },
      {
        label: 'Air travel (%)',
        value: toPercentage(footprint.airTravel.value, footprint.total.value),
      },
    ]
  }, [footprint])

  useEffect(() => {
    if (!footprint) {
      router.push('/')
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
            fontWeight="700"
            color="secondary.dark"
          >
            This is your Carbon Footprint
          </Typography>
          <Image src={smileEmoji} alt="" width={32} height={32} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PieChart
            series={[
              {
                data: pieChartData,
                cx: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 20,
                  additionalRadius: -20,
                  color: 'gray',
                },
              },
            ]}
            height={350}
            width={300}
            colors={['#34CB79', '#322153', '#8257E5']}
            slotProps={{ legend: { padding: -40 } }}
          />
          <TableContainer
            variant="outlined"
            component={Paper}
            sx={{ width: 600 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <b>Name</b>
                  </StyledTableCell>
                  <StyledTableCell>
                    <b>Emission</b>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {footprintBreakdownRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>
                      <b>{row.emission}</b>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Typography
            variant="h6"
            fontFamily="ubuntu"
            fontWeight="700"
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
          <Button type="button" variant="contained" sx={{ padding: 1.5 }}>
            Try again!
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  )
}
