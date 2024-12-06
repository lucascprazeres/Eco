import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import logoImg from '@eco/assets/logo.svg'

export function Logo() {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography
        variant="h4"
        color="primary.dark"
        fontFamily="ubuntu"
        fontWeight="700"
      >
        Eco
      </Typography>
      <Image src={logoImg} alt="" height={40} width={40} />
    </Box>
  )
}
