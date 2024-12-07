import { DefaultLayout } from '@eco/components/default-layout'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <DefaultLayout>
      <Typography
        variant="h3"
        color="primary.dark"
        fontFamily="ubuntu"
        fontWeight="700"
        marginBottom={1}
      >
        Let&apos;s calculate your carbon footprint!
      </Typography>

      <Typography variant="subtitle1" fontFamily="roboto" marginBottom={3}>
        Follow these steps to know how your daily actions impact our environment
        and{' '}
        <Typography color="primary.dark" display="inline" fontWeight="700">
          be the change.
        </Typography>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/calculator')}
      >
        GET STARTED
      </Button>
    </DefaultLayout>
  )
}
