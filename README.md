# Palouf

Palouf is a healthcare platform that allows to register clients and their health reports.

## Project setup

Prerequisites:

- Node.js (version 22.12.0)
- Yarn

To install dependencies use the following command:

```bash
$ yarn install
```

## Running the project

### Docker compose

Prerequisites:

- Docker
- An .env file (see below for definition)

The docker compose file is used to start the project in a containerized environment. It includes the necessary dependencies and configurations to run the project.

To start the project, run the following command:

```bash
$ docker compose up -d --build
```

This will start two containers: one for the database and another for the API. The database container will automatically create the necessary tables and data when it starts.

You can access the API at `http://localhost:3000/`

### local

Prerequisites:

- Node.js (version 22.12.0)
- Yarn
- MySQL (version 9.1.0)

To run the project locally, you need to have Node.js and Yarn installed on your machine.

To install dependencies use the following command:

```bash
$ yarn install
```

generate the primsa client

```bash
$ yarn prisma generate
```

initialize the database

```bash
$ yarn prisma db push
```

generate the primsa client sql

```bash
$ yarn prisma generate --sql
```

Then, you can run the project using the following command:

```bash
$ yarn run start:dev
```

This will start the project in development mode.

### .env file

Create a .env file in the root directory of the project. The .env file contains the necessary environment variables for the project to run.

You can use the .env.example file as a template.

_WARNING_: For docker mode, the MYSQL_HOST should be set to 'mysql' otherwise use 'localhost'.

Note: The .env file is ignored by git, so you don't need to worry about committing sensitive information.

## Database

The database is managed by Prisma. The Prisma schema is defined in the `prisma/schema.prisma` file. The Prisma client is used to interact with the database.

The database is initialized with the `init_db` directory. The `initdb.sql` file contains the necessary SQL commands to create the tables and data.

## API

The API is built using NestJS. A Swagger documentation is available at `http://localhost:3000/api`, solely for non production environments.

The available endpoints are:

- `POST /client`: Create a new client
- `GET /client/{id}`: Retrieve a client by ID
- `PUT /client/{id}`: Update a client by ID
- `DELETE /client/{id}`: Delete a client by ID
- `POST /health-report`: Create a new health report
- `GET /health-report/{clientId}`: Retrieve a list of health report for a client by ID
- `PUT /health-report/{clientId}/{year}`: Update a health report by client ID and year
- `DELETE /health-report/{clientId}/{year}`: Delete a health report by client ID and year

## Scripts

The `src/scripts` directory contains utility scripts for the project.
The scripts are written in TypeScript and can be executed using the `npx tsx ./scripts/{scriptName}.ts` command.

### doppelgangerDetection.ts

This script is used to detect doppelganger clients.
It retrieves a list of clients with the same first name, last name and same health reports year-result.
The script returns an array of client IDs that are doppelganger clients.

## Package commands

### Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Run tests

If you rely on the compose-mysql.yaml file, you will also need to run the following command:

```bash
$ yarn prisma db push
```

Warning: you will need to run the prisma generate sql command before running the tests

```bash
$ yarn prisma generate --sql
```

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Utility commands

```bash
# format code
$ yarn run format

# lint code
$ yarn run lint
```
