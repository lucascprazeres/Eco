import { CarbonFootprintInput } from '@eco/models/carbon-footprint'
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

interface TransportationPanelProps {
  onClickNext: () => void
  onGoBack: () => void
}

export function TransportationPanel({
  onClickNext,
  onGoBack,
}: TransportationPanelProps) {
  const { register, handleSubmit, formState, control } =
    useFormContext<CarbonFootprintInput>()

  const { field, fieldState } = useController({
    name: 'transportationFuelType',
    control,
    rules: {
      required: {
        value: true,
        message: 'Please select at least one option',
      },
    },
  })

  function handleGoToNextTab() {
    onClickNext()
  }

  const error = formState.errors?.transportationFuelGallonsPerMonth?.message

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
        <Box>
          <Typography variant="h6" fontWeight="bold" fontFamily="ubuntu">
            What type of fuel does your vehicle use?
          </Typography>

          <RadioGroup
            name="transporationFuelType"
            value={field.value}
            onChange={field.onChange}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <FormControlLabel
                value="gasoline"
                label="Gasoline"
                control={<Radio />}
              />
              <FormControlLabel
                label="Diesel"
                value="diesel"
                control={<Radio />}
              />
              <FormControlLabel
                label="Ethanol"
                value="ethanol"
                control={<Radio />}
              />
            </Box>
          </RadioGroup>

          <Typography variant="caption" color="error">
            {fieldState.error?.message}
          </Typography>
        </Box>

        <Typography variant="h6" fontWeight="bold" fontFamily="ubuntu">
          How many gallons of fuel do you use in a month?
        </Typography>

        <TextField
          {...register('transportationFuelGallonsPerMonth', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Please insert your fuel usage (or 0 if none)',
            },
          })}
          label="Fuel (gallons)"
          type="number"
          style={{ width: '100%' }}
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
