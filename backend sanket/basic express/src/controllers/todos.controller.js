
import TodoService from "../service/todo.service.js";
import TodoRepository from "../repositories/todo.repository.js";

const todoService = new TodoService(new TodoRepository());

export const getAllTodos = (req, res) => {
    const todos = todoService.getAllTodos();
    res.status(200).json({
        message: "Todos fetched successfully",
        data: todos
    });
}

export const createTodo = (req, res) => {
    const { text } = req.body;
    todoService.create(text);
    res.status(201).json({
        message: "Todo created successfully"
    });
}