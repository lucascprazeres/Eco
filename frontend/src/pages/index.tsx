import { DefaultLayout } from '@eco/components/default-layout'
import { CALCULATOR_PAGE } from '@eco/constants/routes'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <DefaultLayout>
      <Typography
        variant="h3"
        color="secondary.dark"
        fontFamily="ubuntu"
        marginBottom={1}
      >
        Let&apos;s calculate your carbon footprint!
      </Typography>

      <Typography
        variant="subtitle1"
        fontFamily="roboto"
        marginBottom={3}
        fontSize={18}
      >
        Follow these steps to know how your daily actions impact our environment
        and{' '}
        <Typography
          color="primary.dark"
          display="inline"
          fontWeight="bold"
          fontSize={18}
        >
          be the change.
        </Typography>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push(CALCULATOR_PAGE)}
        sx={{ height: 54, fontWeight: 'bold' }}
      >
        GET STARTED
      </Button>
    </DefaultLayout>
  )
}
