import { ApolloClientProvider } from '@eco/lib/apollo/provider'
import { FootprintProvider } from '@eco/providers/footprint-provider'
import '@eco/styles/globals.css'
import { ThemeProvider } from '@eco/styles/theme'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ApolloClientProvider>
        <FootprintProvider>
          <Component {...pageProps} />
        </FootprintProvider>
      </ApolloClientProvider>
    </ThemeProvider>
  )
}
