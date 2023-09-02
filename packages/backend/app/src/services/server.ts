// Import necessary dependencies.
import * as express from 'express';     // Express framework for building web applications.
import * as Middleware from './middleware'; // Custom middleware module to handle express middleware configurations.
import * as Routes from '../routes/router'; // Custom module for defining the application routes.
import * as dotEnv from 'dotenv';       // Module to load environment variables from a .env file.

// Load environment variables from the .env file.
dotEnv.config();

// Create an instance of the express application.
const app: express.Application = express();

// Configure middlewares for the express application.
Middleware.configure(app);

// Initialize application routes.
Routes.init(app);

// Initialize global error handling middleware.
Middleware.initErrorHandler(app);

// Export the configured express application for further use (e.g., starting the server).
export default app;
