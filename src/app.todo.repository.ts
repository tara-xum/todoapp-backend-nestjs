import { Todo } from './interfaces';
import { TodoRepository } from './app.interface.repository';
import { InMemoryTodos } from './data/in-memory-todos';

export class InMemoryTodoRepository implements TodoRepository {
  private idCounter = 3;

  findAll(): Todo[] {
    return InMemoryTodos.data;
  }

  findOne(id: number): Todo | undefined {
    return InMemoryTodos.data.find(t => t.id === id);
  }

  /*
  create(todo: Todo): Todo {
    const newTodo = { ...todo, id: this.idCounter++ };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, data: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    if (!todo) throw new Error('Todo not found');
    Object.assign(todo, data);
    return todo;
  }

  delete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }
    */
}