import { InMemoryTodoRepository } from './app.todo.repository';

describe('InMemoryTodoRepository', () => {
  let repository: InMemoryTodoRepository;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all todos', () => {
        const todos = repository.findAll();
        
        expect(todos).toBeDefined();
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBeGreaterThanOrEqual(0);
    });
  });
  
  describe('findOne', () => {
    it('should return a todo by id', () => {
        const todo = repository.findOne(1);
        
        expect(todo).toBeDefined();
        expect(todo?.id).toBe(1);
        expect(todo?.title).not.toBeNull();
    });

    it('should return undefined when todo with id does not exist', () => {
        const todo = repository.findOne(999);
        
        expect(todo).toBeUndefined();
    });

    it('should return correct todo for different ids', () => {
        const todo2 = repository.findOne(2);
        const todo3 = repository.findOne(3);
        
        expect(todo2?.title).not.toBeNull();
        expect(todo3?.title).not.toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new todo item', () => {
        const newTodoData = { title: 'Test 1', description: 'Test description' };
        
        const newTodo = repository.create(newTodoData);
        
        expect(newTodo).toBeDefined();
        expect(newTodo.id).toBeDefined();
        expect(newTodo.title).toBe(newTodoData.title);
        expect(newTodo.description).toBe(newTodoData.description);

        const fetchedTodo = repository.findOne(newTodo.id);
        expect(fetchedTodo).toEqual(newTodo);
    });
  });

  describe('deleteOne', () => {
    it('should delete a todo by id', () => {
        const initialTodos = repository.findAll();
        const initialLength = initialTodos.length;

        repository.deleteOne(1);
        
        const todosAfterDeletion = repository.findAll();
        expect(todosAfterDeletion.length).toBe(initialLength - 1);
        const deletedTodo = repository.findOne(1);
        expect(deletedTodo).toBeUndefined();
    });
  });

});