import { CalculatorForm } from '@eco/pages/calculator'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export function TravelPanel() {
  const { register, handleSubmit, formState } = useFormContext<CalculatorForm>()

  function handleAddTravels(data: CalculatorForm) {
    console.log(data)
  }

  const error = formState.errors?.airTravel?.message

  return (
    <form
      onSubmit={handleSubmit(handleAddTravels)}
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
          {...register('airTravel', {
            required: {
              value: true,
              message: 'Required',
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
          <Button variant="outlined">Go back</Button>
          <Button type="submit" color="primary" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </form>
  )
}
