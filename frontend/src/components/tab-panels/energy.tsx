import { CalculatorForm } from '@eco/pages/calculator'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

interface EnergyPanelProps {
  onClickNext: () => void
}

export function EnergyPanel({ onClickNext }: EnergyPanelProps) {
  const { register, handleSubmit, formState } = useFormContext<CalculatorForm>()

  function handleGoToNextTab() {
    onClickNext()
  }

  const error = formState.errors?.electricityUsage?.message

  return (
    <form
      onSubmit={handleSubmit(handleGoToNextTab)}
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
          Enter your monthly electricity usage
        </Typography>

        <TextField
          {...register('electricityUsage', {
            required: {
              value: true,
              message: 'Required',
            },
          })}
          label="Electricity usage (Kwh/month)"
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
          <Button variant="outlined">Go back</Button>
          <Button type="submit" color="primary" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </form>
  )
}
