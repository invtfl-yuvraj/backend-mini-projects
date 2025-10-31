import express from 'express';
import { homePingController } from '../../controllers/home.controller.v2.js';

const v2Router = express.Router();

v2Router.get("/ping", homePingController);

export default v2Router;