import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createApolloServer } from './graphql/server'
import { expressMiddleware } from '@apollo/server/express4'
import { createServer, Server } from 'http'

async function main() {
    const app = express()
    const httpServer = createServer(app)
    const apolloServer = createApolloServer(httpServer)

    await apolloServer.start()

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(apolloServer)
    )

    app.get('/health-check', (_, res) => {
        res.json({ ok: true })
    })

    await startServer(httpServer)
}

async function startServer(httpServer: Server) {
    const port = process.env.APP_PORT

    return new Promise<void>((resolve, reject) => {
        httpServer.listen({ port }, () => {
            console.log(`server listening on http://localhost:${port}/graphql`)
            resolve()
        })

        httpServer.on('error', (error) => {
            console.log(`internal server error: `, error)
            reject()
        })
    })
}

main()