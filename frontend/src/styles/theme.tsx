import { green } from '@mui/material/colors'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import { ReactElement } from 'react'

const theme = createTheme({
  palette: {
    primary: { ...green, contrastText: '#FFF' },
    secondary: {
      dark: '#322153',
      main: '#8257E5',
    },
    background: {
      default: '#F0F0F5',
    },
  },
})

export function ThemeProvider(props: { children: ReactElement }) {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}
