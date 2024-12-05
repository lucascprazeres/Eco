import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { carbonFootprintResolver, carbonFootprintTypeDefs } from "./carbon-footprint";

export const resolvers = mergeResolvers([carbonFootprintResolver])
export const typeDefs = mergeTypeDefs([carbonFootprintTypeDefs])