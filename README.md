# react-node-fullstack-app

## Overview

The main objective of this project is to provide a demonstration of how to set up and use a monorepo with both frontend and backend applications integrated.

## Getting Started

1. **Installation**:
   - Run the following command to install the necessary libraries:
     ```bash
     npm install
     ```

2. **Running the Projects**:
   - Execute the following command to start both ReactJS and NodeJS projects simultaneously:
     ```bash
     npm run dev
     ```

## Backend

- The backend is structured using Sequelize for data modeling and migration.
- We have incorporated Swagger for API documentation. You can view and try out the API documentation by visiting: 
  [http://localhost:3002/docs](http://localhost:3002/docs).

## Configuration
 - To set up the initial user, you need to uncomment the `createAccount()` method inside:
   `packages/backend/app/src/database/models/account.model.ts`.

- Necessary configurations are stored in the `.env.development.sh` file located at the root directory. If required, you can modify these configurations to suit your setup.

- This project relies on a Postgres database. Ensure you have Postgres installed and set up a new database. Once the database is ready, update the configurations in the mentioned `.env` file to match your database settings.

## Frontend

- The frontend of this project utilizes ReactJS and is written in TypeScript for type safety and better developer experience.

## Conclusion

This project showcases a monorepo setup with TypeScript employed across all components. It offers a seamless development experience between frontend and backend operations. Adjustments, contributions, and feedback are always welcome!
