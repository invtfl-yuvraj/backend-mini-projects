export default class TodoService {
    // business logic will go here in future

    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    create(todoText){
        if(todoText.length === 0){
            throw new Error("Todo text cannot be empty");
        }
        this.todoRepository.insert(todoText);
    }

    getOneTodo(id){
        return this.todoRepository.get(id);
    }   

    getAllTodos(){
        return this.todoRepository.getAll();
    }

}