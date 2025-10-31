import express from 'express';
import { homePingController } from '../../controllers/home.controller.js';
import todoRouter from './todo.routes.js';

const v1Router = express.Router();

v1Router.use("/todos", todoRouter);
v1Router.get("/ping", homePingController);

export default v1Router;