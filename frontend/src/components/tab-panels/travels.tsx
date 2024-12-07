import { CarbonFootprintInput } from '@eco/models/carbon-footprint'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

interface TravelPanelProps {
  onGoBack: () => void
  onSubmit: (data: CarbonFootprintInput) => void
}

export function TravelPanel({ onGoBack, onSubmit }: TravelPanelProps) {
  const { register, handleSubmit, formState } =
    useFormContext<CarbonFootprintInput>()
  const error = formState.errors?.airTravelsPerYear?.message

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Typography variant="h6" fontWeight="bold" fontFamily="ubuntu">
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
          helperText={error}
          error={!!error}
        />

        <Box
          display="flex"
          alignSelf="flex-end"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          bottom={0}
        >
          <Button variant="outlined" onClick={onGoBack}>
            Go back
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!!error}
          >
            Next
          </Button>
        </Box>
      </Box>
    </form>
  )
}
