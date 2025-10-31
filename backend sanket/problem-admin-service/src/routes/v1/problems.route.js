import express from 'express';
import { problemController } from '../../controllers/index.js';

const problemsRouter = express.Router();

problemsRouter.get("/ping", problemController.pingProblemController);

problemsRouter.post("/", problemController.addProblem);

problemsRouter.get("/", problemController.getAllProblems);

problemsRouter.get("/:id", problemController.getProblemById);

problemsRouter.put("/:id", problemController.updateProblemById);

problemsRouter.delete("/:id", problemController.deleteProblemById);

export default problemsRouter;