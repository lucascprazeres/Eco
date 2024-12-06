import { Logo } from '@eco/components/logo'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <Box height="100vh" width="100vw">
      <Box component="header" width="100%" padding={2}>
        <Logo />
      </Box>

      <Box
        height="90%"
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Typography
          variant="h3"
          color="primary.dark"
          fontFamily="ubuntu"
          fontWeight="700"
        >
          Let&apos;s calculate your carbon footprint!
        </Typography>

        <Typography variant="subtitle1" fontFamily="roboto" marginBottom={2}>
          Follow these steps to know how your daily actions impact our
          environment and{' '}
          <Typography color="primary.dark" display="inline" fontWeight="700">
            be the change
          </Typography>
        </Typography>

        <Button variant="contained" color="primary">
          GET STARTED
        </Button>
      </Box>
    </Box>
  )
}
