import express from 'express';
import { getAllTodos, createTodo } from '../../controllers/todos.controller.js';
import { todoCreateValidator } from '../../validators/todo.validator.js';

const todoRouter = express.Router();

todoRouter.get("/", getAllTodos);
todoRouter.post("/", todoCreateValidator, createTodo);

export default todoRouter;