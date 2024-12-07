/* eslint-disable prettier/prettier */
'use client'

import { ApolloProvider } from "@apollo/client"
import { createApolloClient } from "./client"

const client = createApolloClient()

export function ApolloClientProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
