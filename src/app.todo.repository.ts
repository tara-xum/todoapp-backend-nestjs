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

  deleteOne(id: number): void {
    InMemoryTodos.data = InMemoryTodos.data.filter(t => t.id !== id);
  }

}