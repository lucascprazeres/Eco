import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { Server } from 'http'

export function createApolloServer(httpServer?: Server): ApolloServer {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: httpServer
      ? [ApolloServerPluginDrainHttpServer({ httpServer })]
      : [],
  })

  return apolloServer
}
