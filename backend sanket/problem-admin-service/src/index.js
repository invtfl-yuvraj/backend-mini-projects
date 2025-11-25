import express from 'express';
import bodyParser from 'body-parser';

import SERVER_CONFIG from './config/server.config.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './utils/errorHandler.js';
import { dbConnect } from './config/dbConnect.config.js';
import { healthCheck } from './utils/healthCheck.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', healthCheck("Server"));

// all api routes will be prefixed with /api
app.use("/api", apiRouter);

// Global Error Handling Middleware
app.use(errorHandler);

app.listen(SERVER_CONFIG.PORT, async () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
  await dbConnect();
});