const todos = [];

export default class TodoRepository {
    getAll() {
        return todos;
    }

    insert(todoText) {
        const todo = {
            id: todos.length + 1,
            text: todoText
        };
        todos.push(todo);
    }

    get(id){
        return todos.find(todo => todo.id === id);
    }
}