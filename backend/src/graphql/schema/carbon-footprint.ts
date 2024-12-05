export const carbonFootprintTypeDefs = `#graphql
    type Query {
        message: String
    }
`

export const carbonFootprintResolver = {
    Query: {
        message: () => 'hello world'
    }
}