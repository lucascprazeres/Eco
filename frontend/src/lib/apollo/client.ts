import { ApolloClient, InMemoryCache } from '@apollo/client'
import { env } from '@eco/env'

export const createApolloClient = () => {
  return new ApolloClient({
    uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache(),
  })
}
