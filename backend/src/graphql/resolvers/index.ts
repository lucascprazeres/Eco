import { mergeResolvers } from '@graphql-tools/merge'
import { carbonFootprintResolver } from './carbon-footprint'

export const resolvers = mergeResolvers([carbonFootprintResolver])
