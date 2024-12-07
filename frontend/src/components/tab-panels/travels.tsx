import { RESULTS_PAGE } from '@eco/constants/routes'
import { CarbonFootprintInput } from '@eco/models/carbon-footprint'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

interface TravelPanelProps {
  onGoBack: () => void
  onSubmit: (data: CarbonFootprintInput) => Promise<void>
}

export function TravelPanel({ onGoBack, onSubmit }: TravelPanelProps) {
  const router = useRouter()
  const { register, handleSubmit, formState } =
    useFormContext<CarbonFootprintInput>()

  const handleLastSubmit = useCallback(
    async (data: CarbonFootprintInput) => {
      try {
        await onSubmit(data)
        router.push(RESULTS_PAGE)
      } catch (err) {
        console.log(err)
      }
    },
    [router, onSubmit],
  )

  const travelsPerYearError = formState.errors?.airTravelsPerYear?.message

  return (
    <form
      onSubmit={handleSubmit(handleLastSubmit)}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          fontFamily="ubuntu"
          color="secondary.dark"
        >
          How many flights do you take per year?
        </Typography>

        <TextField
          {...register('airTravelsPerYear', {
            valueAsNumber: true,
            required: {
              value: true,
              message:
                'Please insert how many flights do you take (or 0 if none)',
            },
          })}
          label="Flights (per year)"
          type="number"
          fullWidth
          helperText={travelsPerYearError}
          error={!!travelsPerYearError}
        />

        <Box
          display="flex"
          alignSelf="flex-end"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          bottom={0}
        >
          <Button
            variant="outlined"
            onClick={onGoBack}
            sx={{ fontWeight: 'bold' }}
          >
            Go back
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!!travelsPerYearError}
            sx={{ fontWeight: 'bold' }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </form>
  )
}
