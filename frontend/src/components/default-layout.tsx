import { Box } from '@mui/material'
import { ReactElement } from 'react'
import { Logo } from './logo'

interface DefaultLayoutProps {
  children: ReactElement | ReactElement[]
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box height="100vh" width="100vw">
      <Box component="header" width="100%" padding={2} height={72}>
        <Logo />
      </Box>

      <Box
        height="calc(100% - 72px)"
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Box>
  )
}
