# Eco Backend

This application provides the carbon footprint calculations via a GraphQL API

## Tech stack

- Node.js
- TypeScript
- Express.js
- GraphQL
- ApolloServer

## How to run?

```bash
  # clone the project repo
  git clone https://github.com/lucascprazeres/eco

  # setting up the project
  cd backend

  # or yarn
  npm install

  # run it!
  npm run dev
```

Don't forget to rename the file `.env.example` to `.env` in order to load the application envs

After running the app, you can access http://localhost:3000/graphql to access the Apollo Studio

## Commands

- `npm run dev` - run app using tsx
- `npm run build` - build app using tsup
- `npm run start` - run javascript build
- `npm run test` - run tests
- `npm run test:watch` - run tests on watch mode
- `npm run test:cov` - run tests and generates coverage report
- `npm run lint` - run the linter (eslint)

## Architecture

The architecture of this project is meant to be simple and respect the Separation of Concerns principle. The folders are structured as follows:

```bash
|-- src # application code
  |-- calculator # calculator factory
  |-- graphql
    |-- resolvers
    |-- schema # type-defs
    |-- server.ts # apollo server details
  |-- models # interfaces, types and enums
  server.ts # entrypoint
|-- tests # unit tests
```

## License

This project is under **MIT LICENSE**.

---

<div align=center>
  Made by <a href="https://www.linkedin.com/in/lucas-prazeres/">Lucas Prazeres</a> 👽
</div>
