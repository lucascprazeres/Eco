import { green } from '@mui/material/colors'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import { ReactElement } from 'react'

const theme = createTheme({
  palette: {
    primary: { ...green, contrastText: '#FFF' },
  },
})

export function ThemeProvider(props: { children: ReactElement }) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}
