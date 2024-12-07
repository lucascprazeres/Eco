import { useFootprint } from '@eco/providers/footprint-provider'
import { toPercentage } from '@eco/utils/percentage'
import { PieChart } from '@mui/x-charts'
import { useMemo } from 'react'

export function FootprintPieChart() {
  const { footprint } = useFootprint()

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

  return (
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
  )
}
