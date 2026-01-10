import { Inject } from '@nestjs/common';
import { Todo } from './interfaces';
import { TodoRepository } from './app.interface.repository';
import { InMemoryTodos } from './data/in-memory-todos';

export class InMemoryTodoRepository implements TodoRepository {
  private idCounter = 3;
  private todos: InMemoryTodos = InMemoryTodos.data;
  
  constructor(@Inject('InMemoryTodos') todos: InMemoryTodos) {
    this.todos = todos;    
  }

  findAll(): Todo[] {
    return InMemoryTodos.data;
  }

  findOne(id: number): Todo | undefined {
    return InMemoryTodos.data.find(t => t.id === id);
  }

}