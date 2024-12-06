import { mergeTypeDefs } from '@graphql-tools/merge'
import { carbonFootprintTypeDefs } from './carbon-footprint'

export const typeDefs = mergeTypeDefs([carbonFootprintTypeDefs])
