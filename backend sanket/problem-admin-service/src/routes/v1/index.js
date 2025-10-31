import express from 'express';
import problemsRouter from './problems.route.js';

const v1Router = express.Router();

v1Router.use("/problems", problemsRouter);

export default v1Router;