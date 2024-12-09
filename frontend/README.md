# Eco Frontend

This web application provides the interface of the carbon footprint calculator

## Tech stack

- React
- TypeScript
- Next.js
- GraphQL
- Apollo Client
- Material UI
- React-hook-form

## How to run?

```bash
  # clone the project repo
  git clone https://github.com/lucascprazeres/eco

  # setting up the project
  cd frontend

  # or yarn
  npm install

  # run it!
  npm run dev
```

Don't forget to rename the file `.env.example` to `.env` in order to load the application envs

After running the app, you can access the frontend in http://localhost:3001. Make sure you are also running the backend application, to access all features.

## Commands

- `npm run dev` - run app using tsx
- `npm run build` - build app using tsup
- `npm run start` - run javascript build
- `npm run test` - run tests
- `npm run test:watch` - run tests on watch mode
- `npm run test:cov` - run tests and generates coverage report
- `npm run lint` - run the linter (eslint)

## Architecture

The architecture of this project is meant to be simple and respect the Separation of Concerns principle, also maintaning a common pattern of next.js apps. The folders are structured as follows:

```bash
|-- src # application code
  |-- assets # icons and images
  |-- components # ui components
  |-- constants # common constants
  |-- graph
    |-- apollo # apollo client setup
  |-- models # interfaces, types and enums
  |-- pages # next.js file system routing
  |-- styles # globals and theme configuration
  env.ts # env setup
|-- tests # unit tests
  |-- components # component tests
  |-- pages # page tests
  |-- providers # providers tests
  |-- utils # utils tests
  |-- mocks # mocked data
  |-- setup.ts # some vitest configuration
```

## License

This project is under **MIT LICENSE**.

---

<div align=center>
  Made by <a href="https://www.linkedin.com/in/lucas-prazeres/">Lucas Prazeres</a> 👽
</div>

